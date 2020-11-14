const express = require('express');
const driver = require('../../config/db.js').driver;
const router = express.Router();

router.post('/', async function (req, res) {
  const messageSession = driver.session();
  const postedSession = driver.session();

  const authorId = req.body.profileId;
  const text = req.body.text;
  const timestamp = new Date().toString();

  await messageSession
    .run(
      'CREATE (a:Message {authorId: $authorIdParam, text: $textParam, timestamp: $timestampParam})',
      { authorIdParam: authorId, textParam: text, timestampParam: timestamp }
    )
    .catch(function (err) {
      console.log(err);
    })
    .finally(() => messageSession.close());

  await postedSession
    .run(
      'MATCH (a:Message), (b:Profile) WHERE a.authorId = b.userId MERGE (b)-[r:posted]->(a)'
    )
    .catch(function (err) {
      console.log(err);
    })
    .finally(() => postedSession.close());
    
    res.end();
});

module.exports = router;
