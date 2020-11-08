const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/default.json");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

/**
 *@swagger
 * path:
 *  /api/users/:
 *    post:
 *      tags:
 *        - users
 *      summary: Register a new user
 *      parameters:
 *        - in: body
 *          name: body
 *          description: User object that needs to be registered
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        '201':
 *          description: User successfully created
 *        '400':
 *          description: Bad Request
 *        '403':
 *          description: User exists already
 *        '500':
 *          description: Internal server error
 */
router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
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
          .json({ errors: [{ msg: "User already exists" }] });
      }

      /* Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      */

      user = new User({
        username,
        password,
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
        },
      };

      jwt.sign(
        payload,
        "mysecrettoken",
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
