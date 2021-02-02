const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// Message search over neo4j database
// Private Route --> DONE
router.get('/messages', auth, async (req, res) => {
  const user = req.user;
  const text = req.query.text;
  try {
    const messages = await query.searchMessages(user, text);
    if (!messages) {
      throw err;
    } else if (!messages.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No message found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        messages
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
