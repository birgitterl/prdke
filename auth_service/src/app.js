const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hi there auth-service works');
});

module.exports = app;