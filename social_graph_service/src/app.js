const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Homepage at localhost:5000
app.get('/', (req, res) => {
  res.send('Social Graph Service is up and running...');
});

// Define API Routes
app.use('/messages', require('./routes/api/messages'));
app.use('/profiles', require('./routes/api/profiles'));
app.use('/follow', require('./routes/api/follow'));
app.use('/viewProfile', require('routes/api/viewProfile'));

module.exports = app;
