const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// Message search over neo4j database
router.get('/messages', auth, async (req, res) => {
  const user = req.user;
  const text = req.query.text;
  try {
    const messages = await query.searchMessages(user, text);

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
