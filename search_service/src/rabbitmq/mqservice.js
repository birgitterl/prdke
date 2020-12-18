const amqp = require('amqplib/callback_api');
const URI = 'amqp://admin:admin@rabbitmq:5672';
const elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elasticsearch:9200'
});
let mqChannel = null;
const QUEUE = 'post_profiles';
const subscribeToQueue = amqp.connect(URI, (connErr, connection) => {
  if (connErr) {
    throw connErr;
  }
  console.log('Connected to rabbitmq');
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    mqChannel = channel;
    console.log('channel created');
    mqChannel.assertQueue(QUEUE, { durable: false });
    console.log('Queue ' + QUEUE + ' created');
    mqChannel.consume(
      QUEUE,
      (msg) => {
        const profile = JSON.parse(msg.content);
        client.index(
          {
            index: 'profile',
            type: 'profile',
            id: profile.username,
            body: profile
          },
          (err) => {
            if (err) {
              console.log(err);
            }
            console.log('Sucess');
          }
        );
        console.log('Message received: ' + msg.content);
      },
      { noAck: true }
    );
  });
});

process.on('exit', () => {
  mqChannel.close();
  console.log('Closing rabbitmq channel');
});

module.exports = subscribeToQueue;
