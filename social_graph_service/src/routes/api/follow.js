const express = require('express');
const driver = require('../../config/db.js').driver;
const router = express.Router();

// TODO: Frontend POST REQUEST: payload USERID A, USERNAME A, USERID B, USERNAME B -> SET EDGE/RELATION between the two profiles + auth?

router.post('/add', async function (req, res) {
  const session = driver.session();
  const followsId = req.body.userIdF;
  const followsName = req.body.userNameF;
  const otherUser = req.body.userName;
  const otherUserId = req.body.userId;
  //const timestamp = new Date().toString();

  await session
    .run(
      'MATCH (f:Profile), (u:Profile) WHERE f.userId = followsId AND u.userId = otherUserId MERGE (f)-[r:follows]->(u)'
    )
    .catch(function (err) {
      console.log(err);
    })
    .finally(() => session.close());
});

module.exports = router;
