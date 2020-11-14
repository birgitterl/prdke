const express = require('express');
const driver = require('../../config/db');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');

// Create a new profile or update existing profile
router.post(
  '/',
  [
    check('privacy', 'Please provide your privacy settings').notEmpty(),
    check(
      'notifications',
      'Please provide your notification settings'
    ).notEmpty()
  ],
  auth,
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
        res.status(400).json({ msg: 'There is no profile for this user' });
      } else {
        console.log('POST: Profile created or updated');
        res.json(result[0]);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get my profile
router.get('/me', auth, async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    const result = await query.findProfile(user);

    if (!result) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    } else {
      console.log('GET: Here is my profile');
      res.json(result[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all Profiles
router.get('/', async function (req, res) {
  try {
    let result = await query.getAllProfiles();
    if (!result) {
      res.status(404).send({ msg: 'No profiles found' });
    } else {
      console.log('GET: all profiles');
      res.json(result);
    }
  } catch (error) {}
});

// Delete all Profiles (DEV only --> @TODO: delete)
router.delete('/', async (req, res) => {
  try {
    let result = await query.deleteAllProfiles();
    if (!result) {
      res.status(404).send({ msg: 'Something went wrong' });
    } else {
      res.status(200).json({
        msg: 'All users removed'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

module.exports = router;
