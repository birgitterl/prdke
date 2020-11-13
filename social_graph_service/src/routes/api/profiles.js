const express = require('express');
const driver = require('../../config/db');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const query = require('../../neo4j/queries.js');

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
        res.json('no such profile found');
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

//test route for auth tests
/* router.get('/', auth, async (req, res) => {
  const msg = { text: 'blah blah blah' };
  res.json(msg);
}); */

module.exports = router;
