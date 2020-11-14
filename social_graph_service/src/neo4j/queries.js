var driver = require('../config/db');

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
    'MERGE(a:Profile {username:$user.username}) ON CREATE SET a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background ON MATCH SET a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background RETURN a AS profile';
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
