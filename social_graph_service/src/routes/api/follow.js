const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// Add a new relationship between two profiles
// Private Route
router.post('/', auth, async (req, res) => {
  const user = req.user.username;
  const otherUser = req.body.username;
  try {
    let result = await query.createFollowRelationship(user, otherUser);
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      let response = { relationship: result };

      return res.status(201).json(response);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Delete a specific relationship
// Private Route
router.delete('/:username', auth, async (req, res) => {
  const user = req.user.username;
  const otherUser = req.params.username;

  try {
    let result = await query.deleteFollowRelationship(user, otherUser);
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      let response = { relationship: result };
      return res.status(201).json(response);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});
// GET check if follow relationship between current user and profile of interest exists
// Private Route
router.get('/:username', auth, async (req, res) => {
  const user = req.user.username;
  const other = req.params.username;
  let response = null;
  try {
    const followers = await query.getFollowRelationship(user, other);
    response = { following: followers };
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

// GET profiles that follow me -> incoming
// Private Route
//@TODO delete this route, if incoming nodes are not from interest (e.g. display number of following users)
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
