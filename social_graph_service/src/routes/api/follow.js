const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// Add a new relationship between two profiles
// Private Route
router.post('/', auth, async (req, res) => {
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
// @TODO: change to path: /:username and add const otherUser = req.params.username;
// @TODO: change swagger doku
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

// GET profiles that follow me -> incoming
// Private Route
router.get('/myFollowers', auth, async (req, res) => {
  const user = req.user;
  try {
    const followers = await query.getFollowers(user);
    if (followers.length <= 0) {
      return res.status(404).send('No follower found');
    } else {
      return res.status(200).json(followers);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

//@TODO delete this route?? what is it for?
router.post('/followers', auth, async (req, res) => {
  const user = {
    username: req.body.body.user.username
  };
  console.log(user);
  try {
    const followers = await query.getFollowers(user);
    if (!followers) {
      return res.status(404).send('Nobody is following you');
    } else {
      return res.status(200).json(followers);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
