const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');
const rabbitMQ = require('../../rabbitmq/publisher');

// Create a new profile or update existing profile
// Private route --> DONE
router.post('/', auth, async (req, res) => {
  const user = req.user;
  const profile = req.body;

  try {
    let result = await query.createOrUpdateProfile(user, profile);

    if (!result) {
      throw err;
    } else {
      let msg = JSON.stringify(result);
      rabbitMQ.publish('profiles', Buffer.from(msg));
      return res.status(201).json({
        status: 201,
        profile: result
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get my profile
// Private route --> DONE
router.get('/me', auth, async (req, res) => {
  const username = req.user.username;
  try {
    const profile = await query.getProfile(username);
    if (!profile) {
      return res.status(404).json({
        status: 404,
        msg: 'No profile found'
      });
    } else if (profile.error) {
      throw err;
    } else {
      delete profile['username'];
      return res.status(200).json({
        status: 200,
        profile
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get all Profiles (DEV only)
// --> DONE
router.get('/', async (req, res) => {
  try {
    let result = await query.getAllProfiles();
    if (!result) {
      throw err;
    } else if (!result.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No profiles found'
      });
    } else {
      return res.status(200).json({
        status: 200,
        profiles: result
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

//Get a profile by username
// --> DONE
router.get('/:username', auth, async (req, res) => {
  let username = req.params.username;
  try {
    const profile = await query.getProfile(username);
    if (!profile) {
      return res.status(404).json({
        status: 404,
        msg: 'No profile found'
      });
    } else if (profile.error) {
      throw err;
    } else {
      return res.status(200).json({
        status: 200,
        profile
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete all Profiles (DEV only)
// --> DONE
router.delete('/', async (req, res) => {
  try {
    let result = await query.deleteAllProfiles();
    if (!result) {
      throw err;
    } else {
      return res.status(200).json({
        status: 200,
        msg: 'All profiles removed'
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
