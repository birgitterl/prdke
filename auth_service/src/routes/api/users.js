const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// Register a new user
router.post(
  '/',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        username,
        password
      });

      // Encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // save user to DB
      await user.save();

      // Return jsonwebtoken (change expires to 3600)
      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      };

      jwt.sign(
        payload,
        'mysecrettoken',
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.status(201).json({ token });
        }
      );
    } catch (err) {
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
  }
);

// Delete all registered users (DEV --> @TODO delete afterwards)
router.delete('/', async (req, res) => {
  try {
    await User.remove();
    res.status(200).json({
      msg: 'All users removed'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
