const app = require('./src/app');
const connectRabbit = require('./src/rabbitmq/consumer');

// Connect to RabbitMQ
connectRabbit.start();

// Connect to port
app.listen(7050, () => {
  console.log('Server started on port 7050...');
});
