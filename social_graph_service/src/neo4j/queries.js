var driver = require('../config/db');

// Profile queries
exports.getProfile = async function (username) {
  var query =
    'MATCH (p:Profile) WHERE p.username=$username RETURN p AS profile';
  var session = driver.session();
  var result = await session.run(query, { username });
  session.close();
  return result.records.map((record) => record.get('profile').properties)[0];
};

exports.createOrUpdateProfile = async function (user, props) {
  var query =
    'MERGE(a:Profile {username:$user.username}) ON CREATE SET a.username=$user.username, a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background ON MATCH SET a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications RETURN a AS profile';
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

exports.searchProfiles = async function (text) {
  var query =
    'MATCH(p:Profile) WHERE p.username CONTAINS $text RETURN p as profile';
  var session = driver.session();
  var result = await session.run(query, { user, text });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

// Follow queries
exports.createFollowRelationship = async function (user, otherUser) {
  var query =
    'MATCH (f:Profile), (u:Profile) WHERE f.username=$user AND u.username = $otherUser MERGE (f)-[r:follows]->(u) RETURN type(r) as following';
  var session = driver.session();
  var result = await session.run(query, { user, otherUser });
  session.close();
  return result.records.map((record) => record.get('following'))[0];
};

exports.deleteFollowRelationship = async function (user, otherUser) {
  var query =
    'MATCH (f:Profile {username:$user} ) -[r:follows]->(u:Profile {username:$otherUser}) DELETE r return "unfollows"';
  var session = driver.session();
  var result = await session.run(query, { user, otherUser });
  session.close();
  return result.records.map((record) => record.get(0))[0];
};

exports.getFollowers = async function (user) {
  var query =
    'MATCH(x {username: $user.username})<-[r]-(p:Profile) RETURN p AS followers ORDER BY p.username ASC';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('followers').properties);
};

exports.getFollowRelationship = async function (user, other) {
  var query =
    'MATCH  (p:Profile {username: $user}), (b:Profile {username: $other}) RETURN EXISTS( (p)-[:follows]->(b) ) AS blaah  ';
  var session = driver.session();
  var result = await session.run(query, { user, other });
  session.close();
  return result.records.map((record) => record.get(0))[0];
};

// Message queries

// Post a message
exports.createMessage = async function (user, text, emoji) {
  var timestamp = new Date().toString();
  var hashtags = text.match(/#\w+/g);
  var message;

  var query1 =
    'CREATE (a:Message {author: $user.username, text: $text, emoji: $emoji, timestamp: $timestamp}) RETURN a AS message';
  var query2 =
    'MATCH (a:Message), (b:Profile) WHERE a.author = b.username MERGE (b)-[r:posted]->(a)';
  var query3 = 'MERGE (a:Hashtag {name: $hashtag})';
  var query4 =
    'MATCH (a:Message) WHERE ID(a)=$messageId MATCH (b:Hashtag) WHERE b.name=$hashtag MERGE (a)-[r:contains]->(b)';

  var messageSession = driver.session();
  var postedSession = driver.session();
  var hashTagSession = driver.session();
  var containsSession = driver.session();

  // Return nach dem ersten catch error --> Rollback falls bei den weiteren sessions ein Fehler kommt
  await messageSession
    .run(query1, { user, text, emoji, timestamp })
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

  if (hashtags !== null) {
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
  }
  return message;
};

// Get all Messages
exports.getAllMessages = async function (user) {
  var query = 'MATCH(m:Message) RETURN m as messages';
  var session = driver.session();
  var result = await session.run(query);
  session.close();
  return result.records.map((record) => record.get('messages').properties);
};

// Delete all messages
exports.deleteAllMessages = async function () {
  var query = 'MATCH (m:Message) DETACH DELETE m';
  var session = driver.session();
  var result = await session.run(query);
  session.close();
  if (result) return true;
};

// Message queries for timeline (usertimeline)
exports.getMyMessages = async function (user) {
  var query =
    'MATCH(x {username: $user.username})-[r]->(m:Message) RETURN m AS message LIMIT 30';
  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

// getOtherMessages from all profiles I follow (hometimeline)
exports.getMessagesIFollow = async function (user) {
  var query =
    'MATCH (p:Profile {username: $user.username}) CALL {WITH p MATCH (p)-[:follows]->(other:Profile) RETURN other} CALL {WITH other MATCH (other)-[:posted]->(m:Message) return m AS message LIMIT 3} RETURN message LIMIT 100';

  var session = driver.session();
  var result = await session.run(query, { user });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

// @TODO: eventuell noch messages von public profiles ausgeben
exports.searchMessages = async function (user, text) {
  var query =
    'MATCH (m:Message) WHERE (:Profile {username: $user.username})-[:follows]->(:Profile)-[:posted]->(m:Message) AND toLower(m.text) CONTAINS toLower($text) RETURN m AS message UNION MATCH (n:Message) WHERE (:Profile {privacy: true})-[:posted]->(n:Message) AND toLower(n.text) CONTAINS toLower($text) RETURN n AS message';
  var session = driver.session();
  var result = await session.run(query, { user, text });
  session.close();
  return result.records.map((record) => record.get('message').properties);
};

// getMessages of a specific profile (profiletimeline if required)
exports.getMessagesOfUser = async function (username) {
  var query = 'MATCH(m:Message {author: $username}) RETURN m as messages';
  var session = driver.session();
  var result = await session.run(query, { username });
  session.close();
  return result.records.map((record) => record.get('messages').properties);
};
