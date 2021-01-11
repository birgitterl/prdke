const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

//@TODO: eliminate route after elastic implementation
router.get('/messages', auth, async (req, res) => {
  const user = req.user;
  try {
    const messages = await query.searchMessages(user, req.query.text);

    if (!messages.length) {
      return res.status(404).send('No messages found');
    } else {
      return res.status(200).json(messages);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

router.get('/profiles', auth, async (req, res) => {
  try {
    let result = await query.getAllProfiles();
    if (!result.length) {
      return res.status(404).json({ errors: [{ msg: 'No profiles found' }] });
    } else {
      const s = req.query.username;
      const regex = new RegExp(s, 'i');
      return res
        .status(200)
        .json(result.filter(({ username }) => username.match(regex)));
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
