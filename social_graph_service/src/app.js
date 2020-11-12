const express = require('express');
const path = require('path');
const driver = require('./config/db.js').driver;

const app = express();

/* TODO @Skrolux DELETE when index.ejs is no longer in use
// View Engine
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');
*/

// Body Parser Middleware
app.use(express.json());

/* TODO @Skrolux DELETE when index.ejs is no longer in use
app.use(express.urlencoded({ extended: false }));
*/

// Homepage at localhost:5000
app.get('/', (req, res) => {
  res.send('Social Graph Service is up and running...');
});

// Define API Routes
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/relations', require('./routes/api/relations'));

module.exports = app;
