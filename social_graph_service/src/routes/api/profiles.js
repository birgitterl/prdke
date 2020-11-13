const express = require('express');
const driver = require('../../config/db');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');

/**
 * @swagger
 * definitions:
 *   Profile:
 *     type: object
 *     required:
 *     - username
 *     - privacy
 *     - notifications
 *     properties:
 *       username:
 *         type: string
 *         example: Julia
 *       gender:
 *         type: string
 *         enum:
 *           - male
 *           - female
 *           - transgender
 *         example: female
 *       birthday:
 *         type: date
 *         example: 1990-01-01
 *       hometown:
 *         type: string
 *         example: Linz
 *       background:
 *         type: string
 *         example: none
 *       privacy:
 *         type: string
 *         enum:
 *           - private
 *           - public
 *         default: public
 *         example: public
 *       notification:
 *         type: boolean
 *         default: false
 *         example: false
 */

/**
 *@swagger
 * path:
 *  /api/profiles:
 *    post:
 *      tags:
 *        - profiles
 *      summary: Create a new profile or update an existing one
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Profile object to be created or updated
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Profile'
 *      responses:
 *        '200':
 *          description: OK
 *          schema:
 *             $ref: '#/definitions/Profile'
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
  '/',
  [
    check('privacy', 'Please provide your privacy settings').notEmpty(),
    check(
      'notifications',
      'Please provide your notification settings'
    ).notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }
    const profile = req.body;

    try {
      let result = await query.createOrUpdateProfile(profile);
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

/**
 * @swagger
 * path:
 *   /api/profiles/me:
 *     get:
 *       tags:
 *         - profiles
 *       summary: Get my profile
 *       parameters:
 *         - in: query
 *           name: username
 *           required: true
 *           type: string
 *           example: Julia
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/Profile'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */
router.get('/me', async (req, res) => {
  const myProfile = { username: req.query.username };
  console.log(myProfile);
  try {
    const result = await query.findProfile(myProfile);

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

router.post('/add', async function (req, res) {
  const profileSession = driver.session();

  const userId = req.body.userId;
  const username = req.body.username;

  await profileSession
    .run(
      'CREATE (n:Profile {userId: $userIdParam, username: $usernameParam})',
      { userIdParam: userId, usernameParam: username }
    )
    .catch(function (err) {
      console.log(err);
    })
    .finally(() => profileSession.close());

  res.end();
});

/**
 * @swagger
 * path:
 *   /api/profiles:
 *     get:
 *       tags:
 *         - profiles
 *       summary: Get all profiles
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/Profile'
 *         "404":
 *           description: No users found
 *         "500":
 *           description: Internal server error
 *
 */
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

/**
 * @swagger
 * path:
 *   /api/profiles:
 *     delete:
 *       tags:
 *         - profiles
 *       summary: Delete all registered profiles (for dev tests only)
 *       responses:
 *         "200":
 *           description: All users removed
 *         "404":
 *           description: Something went wrong
 *         "500":
 *           description: Internal server error
 */
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
