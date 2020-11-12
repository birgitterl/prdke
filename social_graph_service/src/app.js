const express = require('express');
const path = require('path');
const driver = require('./config/db.js').driver;
const app = express();

// Body Parser Middleware
app.use(express.json());

// Homepage at localhost:5000
app.get('/', (req, res) => {
  res.send('Social Graph Service is up and running...');
});

// Define API Routes
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/follow', require('./routes/api/follow'));

module.exports = app;
