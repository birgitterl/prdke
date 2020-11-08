const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

/**
 * @swagger
 * path:
 *   /api/auth/:
 *     get:
 *       tags:
 *         - auth
 *       summary: Get user by token
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/User'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    await res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 *@swagger
 * path:
 *  /api/auth/:
 *    post:
 *      tags:
 *        - auth
 *      summary: Authenticate user and get token
 *      parameters:
 *        - in: body
 *          name: body
 *          description: User object that needs to be authenticated
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Bad Request
 *        '403':
 *          description: Forbidden - User exists already
 *        '404':
 *          description: Not found - Invalid credentials
 *        '500':
 *          description: Internal server error
 */
router.post(
  "/",
  [
    check("username", "Please include a valid username").exists(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Not found - Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Not found - Invalid Credentials" }] });
      }

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
