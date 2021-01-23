const app = require('./src/app');
const connectRabbit = require('./src/rabbitmq/publisher.js');

// Connect to RabbitMQ
connectRabbit.start();

// Connect to port
app.listen(5000, () => {
  console.log('Server started on port 5000...');
});
