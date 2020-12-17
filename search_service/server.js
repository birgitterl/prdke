//const connectDB = require('./src/config/db');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./src/config/swaggerDoc.yaml');
const cors = require('cors');
const connectRabbitMQ = require('./src/rabbitmq/mqservice');
const subsribeToQueue = require('./src/rabbitmq/mqservice');
const app = express();

// Init middleware
app.use(express.json());
app.use(cors());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

app.get('/', (req, res) => {
  res.send('Search Service up and running...');
});

// Connect to port
app.listen(7050, () => {
  console.log('Server started on port 7050...');
});
