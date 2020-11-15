const express = require('express');
const driver = require('../../config/db');
const router = express.Router();
const auth = require('../../middleware/auth');

router.post('/', auth, async function (req, res) {
  const messageSession = driver.session();
  const postedSession = driver.session();

  const user = req.user;
  const text = req.body.text;
  const timestamp = new Date().toString();

  var result1 = await messageSession
    .run(
      'CREATE (a:Message {author: $authorParam, text: $textParam, timestamp: $timestampParam}) RETURN a AS message',
      {
        authorParam: user.username,
        textParam: text,
        timestampParam: timestamp
      }
    )
    .catch(function (err) {
      console.log(err);
    });
  messageSession.close();
  await postedSession
    .run(
      'MATCH (a:Message), (b:Profile) WHERE a.author = b.username MERGE (b)-[r:posted]->(a)'
    )
    .catch(function (err) {
      console.log(err);
    });
  postedSession.close();
  return res
    .status(201)
    .json(result1.records.map((record) => record.get('message').properties)[0]);
});

module.exports = router;
