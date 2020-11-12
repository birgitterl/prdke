const express = require('express');
const driver = require('../../config/db.js').driver;
const router = express.Router();

// TODO: Frontend POST REQUEST: payload USERID A, USERNAME A, USERID B, USERNAME B -> SET EDGE/RELATION between the two profiles + auth?

router.post('/add', function (req, res) {
  const session = driver.session();
  const followsId = req.query.userIdF;
  const followsName = req.query.userNameF;
  const user = req.query.userName;
  const userId = req.query.userId;
  const timestamp = new Date().toString();

  session
    .run(
      'CREATE (f:Follows {followsId: $followsId, followsName: $followsName, userId: $userId, userName: $userName, timestamp: $timestampParam) RETURN f',
      {
        followsId: followsId,
        followsName: followsName,
        userId: userId,
        userName: userName,
        timestamp: timestampParam
      }
    )
    .then(() => session.close());
});

module.exports = router;
