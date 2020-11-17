const express = require('express');
const driver = require('../../config/db');
const auth = require('../../middleware/auth');
const router = express.Router();

router.post('/', auth, async function (req, res) {
  const session = driver.session();
  const followsName = req.user;
  const otherUser = req.body.username;

  await session
    .run(
      'MATCH (f:Profile {username: $followsName})' +
        'MATCH (u:Profile {username: $otherUser})' +
        'MERGE (f)-[r:follows]->(u) RETURN r as following',
      { followsName: followsName.username, otherUser: otherUser }
    )
    .catch(function (err) {
      console.log(err);
      //res.status().send(err.message); TODO
    });
  session.close();
  return res.status(201).send('Relation created');
});

router.delete('/', auth, async function (req, res) {
  const session = driver.session();
  const followsName = req.user;
  const otherUser = req.body.username;
  await session
    .run(
      'MATCH (f:Profile {username: $followsName}) -[r:follows]-> ({username: $otherUser}) DELETE r',
      { followsName: followsName.username, otherUser: otherUser }
    )
    .catch(function (err) {
      console.log(err);
      //res.status().send(err.message); TODO
    });
  session.close();
  return res.status(200).send('Follow relation deleted');
});

module.exports = router;
