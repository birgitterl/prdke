const mongoose = require("mongoose");

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *     - username
 *     - password
 *     properties:
 *       username:
 *         type: string
 *         example: Julia
 *       password:
 *         type: string
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
