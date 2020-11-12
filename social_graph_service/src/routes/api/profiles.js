const express = require('express');
const driver = require('../../config/db.js').driver;
const router = express.Router();

router.post('/add', async function (req, res) {
  const profileSession = driver.session();

  const userId = req.body.userId;
  const username = req.body.username;

  await profileSession
    .run(
      "CREATE (n:Profile {userId: $userIdParam, username: $usernameParam})",
      { userIdParam: userId, usernameParam: username }
    )
    .catch(function (err) {
      console.log(err);
    })
    .finally(() => profileSession.close());

    res.end();
});

module.exports = router;
