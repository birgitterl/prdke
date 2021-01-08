var driver = require('../config/db');

// Profile queries
exports.findProfile = async function (username) {
  var query =
    'MATCH (p:Profile) WHERE p.username=$username RETURN p AS profile';
  var session = driver.session();
  var result = await session.run(query, { username });
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

exports.getFollowers = async function (user) {
  var query =
    'MATCH(x {username: $user.username})<-[r]-(p:Profile) RETURN p.username AS followers ORDER BY p.username ASC';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('followers'));
};

// Message queries for timeline
exports.getMyMessages = async function (user) {
  var query =
    'MATCH(x {username: $user.username})-[r]->(m:Message) RETURN m AS message LIMIT 30';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

// getOtherMessages from all profiles I follow
exports.getMessagesIFollow = async function (user) {
  var query =
    'MATCH (p:Profile {username: $user.username}) CALL {WITH p MATCH (p)-[:follows]->(other:Profile) RETURN other} CALL {WITH other MATCH (other)-[:posted]->(m:Message) return m AS message LIMIT 10} RETURN message LIMIT 100';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

// getMessages of a specific profile I follow
exports.getMessagesFromProfileIFollow = async function (user, otherUser) {
  var query =
    'MATCH (p:Profile {username: $user.username})-[:follows]->(p2:Profile {username: $otherUser.username})-[:posted]->(m:Message) return p2, m AS message LIMIT 30';
  var session = driver.session();
  var result = await session.run(query, { user, otherUser });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

exports.createMessage = async function (user, text) {
  var timestamp = new Date().toString();
  var hashtags = text.match(/#\w+/g);
  var message;

  var query1 =
    'CREATE (a:Message {author: $user, text: $text, timestamp: $timestamp}) RETURN a AS message';
  var query2 =
    'MATCH (a:Message), (b:Profile) WHERE a.author = b.username MERGE (b)-[r:posted]->(a)';
  var query3 = 'MERGE (a:Hashtag {name: $hashtag})';
  var query4 =
    'MATCH (a:Message) WHERE ID(a)=$messageId MATCH (b:Hashtag) WHERE b.name=$hashtag MERGE (a)-[r:contains]->(b)';

  var messageSession = driver.session();
  var postedSession = driver.session();
  var hashTagSession = driver.session();
  var containsSession = driver.session();

  await messageSession
    .run(query1, { user, text, timestamp })
    .then((res) => {
      message = res.records[0]._fields[0].properties;
      messageId = res.records[0]._fields[0].identity.low;
    })
    .catch(function (err) {
      console.log(err);
    });
  messageSession.close();

  await postedSession.run(query2).catch(function (err) {
    console.log(err);
  });
  postedSession.close();
  console.log('TEST');

  console.log(hashtags);

  for (var hashtag of hashtags) {
    console.log(hashtag);

    await hashTagSession.run(query3, { hashtag }).catch(function (err) {
      console.log(err);
    });
    hashTagSession.close();

    await containsSession
      .run(query4, { messageId, hashtag })
      .catch(function (err) {
        console.log(err);
      });
    containsSession.close();
  }

  console.log(message);
  return message;
};
