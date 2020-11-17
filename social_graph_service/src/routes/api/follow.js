const express = require('express');
const driver = require('../../config/db');
const auth = require('../../middleware/auth');
const router = express.Router();

// Add new relationship between two profiles
// private Route
router.post('/', auth, async function (req, res) {
  const session = driver.session();
  const followsName = req.user;
  const otherUser = req.body.username;

  try {
    var result = await session
      .run(
        'MATCH (f:Profile {username: $followsName})' +
          'MATCH (u:Profile {username: $otherUser})' +
          'MERGE (f)-[r:follows]->(u) RETURN r as following',
        { followsName: followsName.username, otherUser: otherUser }
      )
      .catch(function (err) {
        console.log(err);
      });
    session.close();
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      return res.status(201).send('Relation created');
    }
    session.close();
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Delete a specific relationship
// private Route
router.delete('/', auth, async function (req, res) {
  const session = driver.session();
  const followsName = req.user;
  const otherUser = req.body.username;

  try {
    var result = await session
      .run(
        'MATCH (f:Profile {username: $followsName}) -[r:follows]-> ({username: $otherUser}) DELETE r',
        { followsName: followsName.username, otherUser: otherUser }
      )
      .catch(function (err) {
        console.log(err);
      });
    session.close();
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      return res.status(200).send('Follow relation deleted');
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
