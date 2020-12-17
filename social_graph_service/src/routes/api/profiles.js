const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');
const publishToQueue = require('../../rabbitmq/mqservice');

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
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
      } else {
        // @TODO: check if publish is only done on create or also on update?
        await publishToQueue(result);
        delete result['username'];
        return res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// Get my profile
// Private route
router.get('/me', auth, async (req, res) => {
  const username = req.user.username;
  try {
    const profile = await query.findProfile(username);

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
//@TODO: eliminate query params after search implementation
router.get('/', async function (req, res) {
  try {
    let result = await query.getAllProfiles();
    if (!result.length) {
      return res.status(404).json({ errors: [{ msg: 'No profiles found' }] });
    } else if (req.query.username != 'undefined') {
      const s = req.query.username;
      const regex = new RegExp(s, 'i');
      return res
        .status(200)
        .json(result.filter(({ username }) => username.match(regex)));
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
    let profile = await query.findProfile(username);
    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'No profiles found' }] });
    } else {
      return res.status(200).json(profile);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// Delete all Profiles (DEV only --> @TODO: delete)
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
