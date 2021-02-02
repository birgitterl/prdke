const amqp = require('amqplib/callback_api');
const URI = 'amqp://admin:admin@rabbitmq:5672';

var amqpConn = null;
var pubChannel = null;
var offlinePubQueue = [];

start = () => {
  amqp.connect(URI, (err, conn) => {
    if (err) {
      console.error('[AMQP] conncetion error', err.message);
      return setTimeout(start, 5000);
    }
    conn.on('error', (err) => {
      if (err.message != 'Connection closing') {
        console.error('[AMQP] connection error', err.message);
      }
    });
    conn.on('close', () => {
      console.error('[AMQP] reconnecting...');
      return setTimeout(start, 5000);
    });
    console.log('[AMQP] Publisher connected');
    amqpConn = conn;
    startPublisher();
  });
};

function startPublisher() {
  amqpConn.createChannel((err, ch) => {
    if (closeOnErr(err)) return;
    ch.on('error', (err) => {
      console.error('[AMQP4] channel error', err.message);
    });
    ch.on('close', () => {
      console.log('[AMQP5] channel closed');
    });

    pubChannel = ch;
    while (offlinePubQueue.length > 0) {
      console.log('in der loop');
      var m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1]);
    }
  });
}

publish = (routingKey, content) => {
  try {
    pubChannel.publish('', routingKey, content, { persistent: true }, function (
      err,
      ok
    ) {
      if (err) {
        console.error('[AMQP6] publish', err);
        offlinePubQueue.push([routingKey, content]);
        pubChannel.connection.close();
      }
    });
  } catch (e) {
    console.error('[AMQP7] publish', e.message);
    offlinePubQueue.push([routingKey, content]);
  }
};

function closeOnErr(err) {
  if (!err) return false;
  console.error('[AMQP8] error', err);
  amqpConn.close();
  return true;
}

module.exports = { start, publish };
