const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// TO DO: Delete
const driver = require('../../config/db');

router.post('/', auth, async (req, res) => {
  const user = req.user;
  const text = req.body.text;
  const emoji = req.body.emoji;
  try {
    const result = await query.createMessage(user, text, emoji);
    if (!result) {
      return res.status(400).send('Error while creating message');
    } else {
      return res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// Get my messages
// Private route
router.get('/my', auth, async (req, res) => {
  const user = req.user;
  try {
    const message = await query.getMyMessages(user);
    if (!message) {
      return res.status(404).send('No message found');
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
// Fehler Handling funkt noch nicht
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

//@TODO: eliminate route after elastic implementation
router.get('/search', auth, async (req, res) => {
  const user = req.user;
  try {
    const message = await query.searchMessages(user, req.query.search);

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
