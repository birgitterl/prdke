const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/swaggerDef');
const cors = require('cors');

const app = express();

// Init middleware
app.use(express.json());
app.use(cors());

// Define API Routes:
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Swagger documentation setup - available under 'localhost:8080/api-docs':
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

app.get('/', (req, res) => {
  res.send('Auth Service up and running...');
});

module.exports = app;
