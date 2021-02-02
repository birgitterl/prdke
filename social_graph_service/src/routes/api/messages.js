const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// Post a new message
// Private route --> DONE
router.post('/', auth, async (req, res) => {
  const user = req.user;
  const text = req.body.text;
  const emoji = req.body.emoji;
  try {
    const result = await query.createMessage(user, text, emoji);
    if (!result || result.error) {
      throw err;
    } else {
      return res.status(201).json({
        status: 201,
        message: result
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get all messages (DEV only)
// --> DONE
router.get('/', async (req, res) => {
  try {
    const messages = await query.getAllMessages();
    if (!messages || messages.error) {
      throw err;
    } else if (!messages.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No messages found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        messages
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete all Messages (DEV only)
// --> DONE
router.delete('/', async (req, res) => {
  try {
    let result = await query.deleteAllMessages();
    if (!result || result.error) {
      throw err;
    } else {
      return res.status(200).json({
        status: 200,
        msg: 'All messages removed'
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get my messages
// Private route --> DONE
router.get('/my', auth, async (req, res) => {
  const user = req.user;
  try {
    const message = await query.getMyMessages(user);
    if (!message || message.error) {
      throw err;
    } else if (!message.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No messages found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        message
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get messages from people I follow
// Private Route --> DONE
router.get('/iFollow', auth, async (req, res) => {
  const user = req.user;
  try {
    const message = await query.getMessagesIFollow(user);
    if (!message) {
      throw err;
    } else if (!message.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No messages found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        message
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get messages of a specific profile
// Private route --> DONE
router.get('/:username', auth, async (req, res) => {
  let username = req.params.username;
  try {
    const message = await query.getMessagesOfUser(username);
    if (!message) {
      throw err;
    } else if (!message.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No messages found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        message
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});
module.exports = router;
