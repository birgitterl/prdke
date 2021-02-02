const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');

// Add a new relationship between two profiles (follow)
// Private Route --> DONE
router.post('/:username', auth, async (req, res) => {
  const user = req.user.username;
  const otherUser = req.params.username;
  try {
    let result = await query.createFollowRelationship(user, otherUser);
    if (!result) {
      throw err;
    } else {
      return res.status(201).json({
        status: 201,
        relationship: result
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete a specific relationship (unfollow)
// Private Route -->DONE
router.delete('/:username', auth, async (req, res) => {
  const user = req.user.username;
  const otherUser = req.params.username;

  try {
    let result = await query.deleteFollowRelationship(user, otherUser);
    if (!result) {
      return res.status(404).json({
        status: 404,
        msg: 'Relationship does not exist'
      });
    } else if (result.error) {
      throw err;
    } else {
      return res.status(201).json({
        status: 201,
        relationship: result
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Check if follow relationship between current user and profile of interest exists
// Private Route -->DONE
router.get('/:username', auth, async (req, res) => {
  const user = req.user.username;
  const other = req.params.username;
  try {
    const isFollowing = await query.getFollowRelationship(user, other);
    if (isFollowing === undefined) {
      throw err;
    } else {
      return res.status(200).json({
        status: 200,
        following: isFollowing
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
