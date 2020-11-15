const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');

// Create a new profile or update existing profile
// Private route
router.post(
  '/',
  auth,
  [
    (check('privacy', 'Please provide your privacy settings').notEmpty(),
    check(
      'notifications',
      'Please provide your notification settings'
    ).notEmpty())
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }
    const user = req.user;
    const profile = req.body;

    try {
      let result = await query.createOrUpdateProfile(user, profile);
      if (!result) {
        return res.status(500).send('Server Error');
      } else {
        delete result['username'];
        return res.status(201).json(result);
      }
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
);

// Get my profile
// Private route
router.get('/me', auth, async (req, res) => {
  const user = req.user;
  try {
    const profile = await query.findProfile(user);

    if (!profile) {
      return res.status(404).send('No profile found');
    } else {
      delete profile['username'];
      return res.status(200).json(profile);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Get all Profiles
router.get('/', async function (req, res) {
  try {
    let result = await query.getAllProfiles();
    if (!result.length) {
      return res.status(404).send('No profiles found');
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// Delete all Profiles (DEV only --> @TODO: delete)
router.delete('/', async (req, res) => {
  try {
    let result = await query.deleteAllProfiles();
    if (!result) {
      return res.status(500).send('Server Error');
    } else {
      return res.status(200).send('All users removed');
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
