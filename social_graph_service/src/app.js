const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./src/config/swaggerDoc.yaml');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Homepage at localhost:5000
app.get('/', (req, res) => {
  res.send('Social Graph Service is up and running...');
});

// Define API Routes
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/follow', require('./routes/api/follow'));
//app.use('/viewProfile', require('./routes/api/viewProfile'));

// Swagger documentation setup - available under 'localhost:5000/api-docs':
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

module.exports = app;
