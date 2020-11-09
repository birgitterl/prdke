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
 *   /api/auth:
 *     get:
 *       tags:
 *         - auth
 *       summary: Get user by token
 *       security:
 *         - authentication: []
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 5fa81a2d156661003b0899f2
 *               username:
 *                 type: string
 *                 example: Julia
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
 *  /api/auth:
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
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhODFhMmQxNTY2NjEwMDNiMDg5OWYyIn0sImlhdCI6MTYwNDg1NTgwOSwiZXhwIjoxNjA1MjE1ODA5fQ.XUZZrYGuUxBk4WQis8VII4GGadFESHwg8Il994WPk04
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
