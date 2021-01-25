const amqp = require('amqplib/callback_api');
const URI = 'amqp://admin:admin@rabbitmq:5672';

const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  requestTimeout: 5000
});

var amqpConn = null;
const queueProfiles = 'profiles';

exports.start = () => {
  amqp.connect(URI, (err, conn) => {
    if (err) {
      console.error('[AMQP] connection error', err.message);
      return setTimeout(this.start, 5000);
    }
    conn.on('error', (err) => {
      if (err.message != 'Connection closing') {
        console.error('[AMQP] connection error', err.message);
      }
    });
    conn.on('close', () => {
      console.error('[AMQP] reconnecting...');
      return setTimeout(this.start, 1000);
    });
    console.log('[AMQP] Consumer connected');
    amqpConn = conn;
    startConsumer();
  });
};

function startConsumer() {
  amqpConn.createChannel((err, ch) => {
    if (closeOnErr(err)) return;
    ch.on('error', (err) => {
      console.error('[AMQP] channel error', err.message);
    });
    ch.on('close', () => {
      console.log('[AMQP] channel closed');
    });

    ch.assertQueue(queueProfiles, { durable: true }, (err, _ok) => {
      if (closeOnErr(err)) return;
      ch.consume(queueProfiles, processProfile, { noAck: true });
      console.log('[AMQP] Consumer is listening to profiles queue...');
    });
  });
}

function processProfile(msg) {
  try {
    let profile = JSON.parse(msg.content);
    if (profile.birthday === '') delete profile['birthday'];
    console.log('[AMQP] Profile received: ' + JSON.stringify(profile));
    elasticClient.index({
      index: 'profiles',
      id: profile.username,
      body: profile
    });
  } catch (err) {
    return setTimeout(this.start, 5000);
  }
}

function closeOnErr(err) {
  if (!err) return false;
  console.error('[AMQP] error', err);
  return true;
}
