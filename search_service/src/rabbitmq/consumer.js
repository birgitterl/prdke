const amqp = require('amqplib/callback_api');
const URI = 'amqp://admin:admin@rabbitmq:5672';

const elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  requestTimeout: 5000
});

const QUEUE = 'search';
var amqpConn = null;

exports.start = () => {
  amqp.connect(URI, (err, conn) => {
    if (err) {
      console.error('[AMQP]', err.message);
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

    ch.assertQueue(QUEUE, { durable: true }, (err, _ok) => {
      if (closeOnErr(err)) return;
      ch.consume(QUEUE, processMsg, { noAck: true });
      console.log('[AMQP] Consumer is listening...');
    });
  });
}

function processMsg(msg) {
  console.log('[AMQP] Message received: ' + msg.content);
  /*
  // @TODO implement save message to elastic
  if (message.save(msg)) {
    console.log('[Mongo] message persisted');
  } else {
    console.log('[Mongo] message not persisted');
  }*/
}

function closeOnErr(err) {
  if (!err) return false;
  console.error('[AMQP] error', err);
  amqpConn.close();
  return true;
}
