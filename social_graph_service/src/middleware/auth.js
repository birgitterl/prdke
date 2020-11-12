const jwt = require('jsonwebtoken');

// Middleware function next is a callback to move on the next piece of middleware
module.exports = function (req, res, next) {
  // Get the token from the header
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  // Check if no token
  if (token == null) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, 'mysecrettoken');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
