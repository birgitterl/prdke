const express = require('express');
const { session } = require('neo4j-driver');
const router = express.Router();

router.get('/', function (req, res) {
  const session = driver.session();

  session
    .run('MATCH(n:Person) RETURN n')
    .then(function (result) {
      const personsArr = [];
      result.records
        .forEach(function (record) {
          personsArr.push({
            id: record._fields[0].identity.low,
            email: record._fields[0].properties.email,
            name: record._fields[0].properties.name,
            surname: record._fields[0].properties.surname,
            password: record._fields[0].properties.password
          });
        })
        .then(() => session.close());

      session
        .run('MATCH(n:Message) RETURN n LIMIT 25')
        .then(function (result2) {
          const messagesArr = [];
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
    })
    .then(() => session.close());
});

module.exports = router;
