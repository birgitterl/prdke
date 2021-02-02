const app = require('./src/app');
const connectRabbit = require('./src/rabbitmq/publisher');

const port = process.env.PORT || 5000;

// Connect to RabbitMQ
connectRabbit.start();

// Connect to port
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
