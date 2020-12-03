var driver = require('../config/db');

// Profile queries
exports.findProfile = async function (user) {
  var query =
    'MATCH (p:Profile) WHERE p.username=$user.username RETURN p AS profile';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();

  return result.records.map((record) => record.get('profile').properties)[0];
};

exports.createOrUpdateProfile = async function (user, props) {
  var query =
    'MERGE(a:Profile {username:$user.username}) ON CREATE SET a.username=$user.username, a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background ON MATCH SET a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background RETURN a AS profile';
  var session = driver.session();
  var result = await session.run(query, { user, props });
  session.close();

  return result.records.map((record) => record.get('profile').properties)[0];
};

exports.deleteAllProfiles = async function () {
  var query = 'MATCH (n:Profile) DETACH DELETE n';
  var session = driver.session();
  var result = await session.run(query);
  session.close();
  if (result) return true;
};

exports.getAllProfiles = async function () {
  var query = 'MATCH(n:Profile) RETURN n as profile';
  var session = driver.session();
  var result = await session.run(query);
  session.close();
  return result.records.map((record) => record.get('profile').properties);
};

// Follow queries
exports.createFollowRelationship = async function (user, otherUser) {
  var query =
    'MATCH (f:Profile {username: $user.username})' +
    'MATCH (u:Profile {username: $otherUser})' +
    'MERGE (f)-[r:follows]->(u) RETURN r as following';
  var session = driver.session();
  var result = await session.run(query, { user, otherUser });
  session.close();
  return result.records.map((record) => record.get('following').properties);
};

exports.deleteFollowRelationship = async function (user, otherUser) {
  var query =
    'MATCH (f:Profile {username: $user.username}) -[r:follows]-> ({username: $otherUser}) DELETE r';
  var session = driver.session();
  var result = await session.run(query, { user, otherUser });
  session.close();
  if (result) return true;
};

// Message queries for timeline
exports.getMyMessages = async function (user) {
  var query =
    'MATCH(x {username: $user.username})-[r]->(m:Message) RETURN type(r), m AS message ORDER BY m.timestamp DESC LIMIT 25';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

exports.getMessagesIFollow = async function (user) {
  var query =
    'MATCH (p:Profile {username: $user.username})-[:follows]->(p2:Profile)-[:posted]->(m:Message) return p2, m AS message ORDER BY m.timestamp DESC LIMIT 25';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};
