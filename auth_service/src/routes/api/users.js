const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// Register a new user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  let user = null;

  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }

  try {
    // See if user exists
    user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        status: 400,
        msg: 'User already exists - Please choose another username'
      });
    }

    user = new User({
      username,
      password
    });

    // Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to MongoDB
    await user.save();

    // Return jsonwebtoken (change expires to 3600)
    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    jwt.sign(payload, 'mysecrettoken', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.status(201).json({
        status: 200,
        token
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Delete all registered users (for testing only)
router.delete('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    await User.remove();
    return res.status(200).json({
      status: 200,
      msg: 'OK - All users removed'
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

// Get all users (for testing only)
router.get('/', async (req, res) => {
  let state = mongoose.connection.readyState;
  if (state !== 1) {
    return res.status(503).json({
      status: 503,
      msg: 'Service unavailable'
    });
  }
  try {
    const users = await User.find().select('-password -_id -__v');
    if (!users.length) {
      return res.status(404).json({
        status: 404,
        msg: 'No users found'
      });
    } else {
      res.status(200).json({
        status: 200,
        users
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Internal server error'
    });
  }
});

module.exports = router;
