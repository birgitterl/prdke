const amqp = require('amqplib/callback_api');
const URI = 'amqp://admin:admin@rabbitmq:5672';

const QUEUE = 'search';
var amqpConn = null;
var pubChannel = null;
var offlinePubQueue = [];

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
    console.log('[AMQP] Publisher connected');
    amqpConn = conn;
    startPublisher();
  });
};

function startPublisher() {
  amqpConn.createChannel((err, ch) => {
    if (closeOnErr(err)) return;
    ch.on('error', (err) => {
      console.error('[AMQP] channel error', err.message);
    });
    ch.on('close', () => {
      console.log('[AMQP] channel closed');
    });

    pubChannel = ch;
    while (true) {
      var m = offlinePubQueue.shift();
      if (!m) break;
      var [exchange, routingKey, content] = m;
      publish(exchange, routingKey, content);
    }
  });
}

exports.publish = (exchange, content) => {
  try {
    pubChannel.publish(
      exchange,
      QUEUE,
      content,
      { persistent: true },
      function (err, ok) {
        if (err) {
          console.error('[AMQP] publish', err);
          offlinePubQueue.push([exchange, routingKey, content]);
          pubChannel.connection.close();
        }
      }
    );
  } catch (e) {
    console.error('[AMQP] publish', e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
};

function closeOnErr(err) {
  if (!err) return false;
  console.error('[AMQP] error', err);
  amqpConn.close();
  return true;
}
