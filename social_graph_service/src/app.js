const express = require('express');
const path = require('path');
const driver = require('./config/db.js').driver;

const app = express();

// View Engine
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
// TODO: Homepage Route doesn' work properly with index-file.
app.get('/', function (req, res) {
  res.render('index.ejs');
});

// Define API Routes
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/relations', require('./routes/api/relations'));

module.exports = app;
