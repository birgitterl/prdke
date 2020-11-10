const express = require('express');
const { session } = require('neo4j-driver');
const router = express.Router();

/*
router.get()
router.post()
router.delete()
router.put()
for more information see: https://github.com/bradtraversy/express_crash_course/blob/master/routes/api/members.js
*/

router.post('/message/add', function (req, res) {
  const session = driver.session();
  const text = req.body.text;
  const author = req.body.author;
  const timestamp = new Date().toString();

  session
    .run(
      'CREATE (n:Message {author: $authorParam, text: $textParam, timestamp: $timestampParam, mentioned: []})',
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
