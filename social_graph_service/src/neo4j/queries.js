var driver = require('../config/db');

/* exports.findProfile = async function (username) {
  var query = 'MATCH(p:Profile) WHERE p.name=$username RETURN p.name';
  var session = driver.session();
  let profilename;

  await session
    .run(query, { username })
    .then((res) => {
      res.records.forEach(function (record) {
        profilename = record._fields[0];
      });
    })
    .then(() => session.close());
  return profilename;
}; */

/* exports.createProfile = async function (
  username,
  birthday,
  hometown,
  gender,
  privacy,
  notifications,
  background
) {
  var query =
    'CREATE(p:Profile {name:$nameParam, birthday:$birthdayParam, hometown:$hometownParam, gender:$genderParam, privacy:$privacyParam, notifications:$notificationsParam, background:$backgroundParam}) RETURN p';

  var session = driver.session();
  let profile;
  try {
    profile = await session
      .run(query, {
        nameParam: username,
        birthdayParam: birthday,
        hometownParam: hometown,
        genderParam: gender,
        privacyParam: privacy,
        notificationsParam: notifications,
        backgroundParam: background
      })
      .then(console.log(profile))
      .then(() => session.close());
  } catch (err) {
    console.log(err.message);
    return err;
  }
  console.log(profile);

  let profile = {
    username: username,
    birthday: birthday,
    hometown: hometown,
    gender: gender,
    privacy: privacy,
    notifications: notifications,
    background: background
  }; 
}; */

/* exports.findProfile = async function (props) {
  var query =
    'MATCH (p:Profile) WHERE p.name=$props.username RETURN p.name AS name';
  var session = driver.session();
  var result;
  result = await session.run(query, { props });
  session.close();
  console.log(result);

  return result.records.map((record) => record.get('name'))[0];
}; */

exports.createOrUpdateProfile = async function (props) {
  var query =
    'MERGE(a:Profile {name:$props.username}) ON CREATE SET a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background ON MATCH SET a.hometown =$props.hometown, a.gender=$props.gender, a.birthday=$props.birthday, a.privacy=$props.privacy, a.notifications=$props.notifications, a.background=$props.background RETURN a AS profile';
  var session = driver.session();
  var result = await session.run(query, { props }).catch(function (err) {
    if (err) console.log(err);
  });
  session.close();

  return result.records.map((record) => record.get('profile').properties);
};
