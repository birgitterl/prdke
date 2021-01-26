const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');
const rabbitMQ = require('../../rabbitmq/publisher');

// Post a new message
// Private route
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

// Get all messages
// Private route
router.get('/', auth, async (req, res) => {
  try {
    const messages = await query.getAllMessages();
    if (!messages.length) {
      return res.status(404).send('No message found');
    } else {
      return res.status(200).json(messages);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Delete all Messages (DEV only --> @TODO: delete)
router.delete('/', auth, async (req, res) => {
  try {
    let result = await query.deleteAllMessages();
    if (!result) {
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    } else {
      return res
        .status(200)
        .json({ errors: [{ msg: 'All messages removed' }] });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
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
// @TODO change path name to something more specific
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
router.get('/:username', auth, async (req, res) => {
  const username = req.params.username;
  try {
    const messages = await query.getMessagesOfUser(username);
    if (!messages.length) {
      return res.status(404).send('No messages found');
    } else {
      return res.status(200).json(messages);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
