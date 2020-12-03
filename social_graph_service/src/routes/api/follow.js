const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');

// Add a new relationship between two profiles
// Private Route
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() });
  }
  const user = req.user;
  const otherUser = req.body.username;

  try {
    let result = await query.createFollowRelationship(user, otherUser);
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      return res.status(201).send('Follow relationship created');
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Delete a specific relationship
// Private Route
router.delete('/', auth, async (req, res) => {
  const user = req.user;
  const otherUser = req.body.username;

  try {
    let result = await query.deleteFollowRelationship(user, otherUser);
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      return res.status(200).send('Follow relationship deleted');
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
