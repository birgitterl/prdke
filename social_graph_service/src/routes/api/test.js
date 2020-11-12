const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/', auth, async (req, res) => {
  const msg = { text: 'blah blah blah' };
  res.json(msg);
});

module.exports = router;
