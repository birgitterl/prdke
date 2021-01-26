const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const query = require('../../neo4j/queries.js');
const rabbitMQ = require('../../rabbitmq/publisher');

// Create a new profile or update existing profile
// Private route
router.post('/', auth, async (req, res) => {
  const user = req.user;
  const profile = req.body;

  try {
    let result = await query.createOrUpdateProfile(user, profile);

    if (!result) {
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    } else {
      let msg = JSON.stringify(result);
      rabbitMQ.publish('profiles', Buffer.from(msg));
      delete result['username'];
      return res.status(201).json(result);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// Get my profile
// Private route
router.get('/me', auth, async (req, res) => {
  const username = req.user.username;
  try {
    const profile = await query.getProfile(username);

    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'No profile found' }] });
    } else {
      delete profile['username'];
      return res.status(200).json(profile);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// Get all Profiles
router.get('/', async function (req, res) {
  try {
    let result = await query.getAllProfiles();
    if (!result.length) {
      return res.status(404).json({ errors: [{ msg: 'No profiles found' }] });
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

//Get a profile by username
router.get('/:username', async (req, res) => {
  let username = req.params.username;
  try {
    let profile = await query.getProfile(username);
    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'No profile found' }] });
    } else {
      return res.status(200).json(profile);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// Delete all Profiles (DEV only)
router.delete('/', async (req, res) => {
  try {
    let result = await query.deleteAllProfiles();
    if (!result) {
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    } else {
      return res
        .status(200)
        .json({ errors: [{ msg: 'All profiles removed' }] });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

module.exports = router;
