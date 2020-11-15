const express = require('express');
const driver = require('../../config/db');
const router = express.Router();

router.post('/', async function (req, res) {
  const session = driver.session();
  const followsName = req.body.username1;
  const otherUser = req.body.username2;

  await session
    .run(
      'MATCH (f:Profile {username: $followsName})' +
        'MATCH (u:Profile {username: $otherUser})' +
        'MERGE (f)-[r:follows]->(u)',
      { followsName: followsName, otherUser: otherUser }
    )
    .catch(function (err) {
      console.log(err);
      //res.status().send(err.message); TODO
    })

    .finally(() => session.close());
  res.end();
  res.status(201);
});

module.exports = router;
