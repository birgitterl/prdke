const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');

// TO DO: Delete
const driver = require('../../config/db');

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

// Get my messages
// Private route
router.get('/my', auth, async (req, res) => {
  const user = req.user;
  try {
    const message = await query.getMyMessages(user);
    if (!message) {
      return res.status(404).send('No messages found');
    } else {
      return res.status(200).json(message);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Get messages from people I follow
// Private Route
router.get('/other', auth, async (req, res) => {
  const user = req.user;
  try {
    const message = await query.getMessagesIFollow(user);
    if (!message) {
      return res.status(404).send('No message found');
    } else {
      return res.status(200).json(message);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Get messages from a specific Profile I follow
// Private Route
router.get('/followedProfile', auth, async (req, res) => {
  const user = req.user;
  const otherUser = req.query;
  try {
    const message = await query.getMessagesFromProfileIFollow(user, otherUser);
    if (!message) {
      return res.status(404).send('No message found');
    } else {
      return res.status(200).json(message);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
