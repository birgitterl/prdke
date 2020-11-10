const express = require('express');
const path = require('path');

//TODO: const would be better than var; see https://stackoverflow.com/questions/44212934/what-is-the-best-way-to-require-node-modules-var-or-const
const bodyParser = require('body-parser');
const driver = require('./config/db.js').driver;
require('ejs');

const app = express();

// View Engine
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define API Routes
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/relations', require('./routes/api/relations'));

/* TODO: Do we really need the following line? Because we have no static folder
app.use(express.static(path.join(__dirname, 'public')));
*/

/*
TODO: @Andreas: Move to messages and profiles route
app.get("/", function (req, res) {
  var session = driver.session();

  session
    .run('MATCH(n:Person) RETURN n')
    .then(function (result) {
      var personsArr = [];
      result.records.forEach(function (record) {
        personsArr.push({
          id: record._fields[0].identity.low,
          email: record._fields[0].properties.email,
          name: record._fields[0].properties.name,
          surname: record._fields[0].properties.surname,
          password: record._fields[0].properties.password
        });
      });

      session
        .run('MATCH(n:Message) RETURN n LIMIT 25')
        .then(function (result2) {
          var messagesArr = [];
          result2.records.forEach(function (record) {
            messagesArr.push({
              author: record._fields[0].properties.author,
              text: record._fields[0].properties.text,
              timestamp: record._fields[0].properties.timestamp
            });
          });
          res.render('index', {
            persons: personsArr,
            messages: messagesArr
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post('/message/add', function (req, res) {
  var session2 = driver.session();
  var text = req.body.text;
  var author = req.body.author;
  var timestamp = new Date().toString();

  session2
    .run(
      'CREATE (n:Message {author: $authorParam, text: $textParam, timestamp: $timestampParam, mentioned: []})',
      { authorParam: author, textParam: text, timestampParam: timestamp })
    .then(function (result) {
      res.redirect('/');
    })
    .catch(function (err) {
      console.log(err);
    });

  res.redirect('/');
});
*/

module.exports = app;
