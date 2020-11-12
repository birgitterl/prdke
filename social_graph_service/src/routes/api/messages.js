const express = require('express');
const driver = require('../../config/db.js').driver;
const router = express.Router();

router.post('/add', function (req, res) {
  const session = driver.session();
  const text = req.query.text;
  const author = req.query.author;
  const timestamp = new Date().toString();

  session
    .run(
      "CREATE (n:Message {author: $authorParam, text: $textParam, timestamp: $timestampParam, mentioned: []}) RETURN n",
      { authorParam: author, textParam: text, timestampParam: timestamp }
    )
    .then(function (result) {
      res.redirect('/');
    })
    .catch(function (err) {
      console.log(err);
    })
    .then(() => session.close());

  res.redirect('/');
});

module.exports = router;
