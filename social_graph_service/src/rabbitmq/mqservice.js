const amqp = require('amqplib/callback_api');
const URI = 'amqp://admin:admin@rabbitmq:5672';

const QUEUE = 'post_profiles';
const publishToQueue = async (profile) => {
  var msg = JSON.stringify(profile);
  amqp.connect(URI, (connErr, connection) => {
    if (connErr) {
      throw connErr;
    }
    console.log('Connected to rabbitmq');
    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }
      console.log('channel created');
      channel.assertQueue(QUEUE, { durable: false });
      console.log('Queue ' + QUEUE + ' created');

      channel.sendToQueue(QUEUE, Buffer.from(msg));
      console.log('Message sent: ' + msg);
      console.log('Closing rabbitmq channel');
    });
  });
};

process.on('exit', () => {
  mqChannel.close();
  console.log('Closing rabbitmq channel');
});

module.exports = publishToQueue;
