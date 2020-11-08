const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
 *          description: User created
 *        '400':
 *          description: Bad Request
 *        '403':
 *          description: Forbidden - User exists already
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

/**
 * @swagger
 * path:
 *   /api/users:
 *     delete:
 *       tags:
 *         - users
 *       summary: Delete all registered users (for dev tests only)
 *       responses:
 *         "200":
 *           description: All users removed
 *           schema:
 *             $ref: '#/definitions/User'
 *         "500":
 *           description: Internal server error
 */
router.delete("/", async (req, res) => {
  try {
    await User.remove();
    await res.status(200).json({
      msg: "All users removed",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
