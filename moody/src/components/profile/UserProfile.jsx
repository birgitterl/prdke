import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
//import { getCurrentProfile } from '../../actions/profile';
//import UserTimeline from './UserTimeline';
//import Header from '../layout/Header';
//import { Container } from 'react-bootstrap';
import Profile from './Profile';
//import ProfileInfo from './ProfileInfo';
//import profileOfInterest from '../search';
import jwt_decode from 'jwt-decode';
import { getProfile } from '../../actions/profile';

export function UserProfile(props) {
  const currentUser = jwt_decode(localStorage.getItem('token'));
  const userName = currentUser.user.username;

  console.log(getProfile(userName));
  getProfile(userName).then((v) => console.log(v));

  let user = function () {
    return getProfile(userName).then((x) => {
      return x;
    });
  };

  let userData = user();
  userData.then(function (res) {});

  return (
    <div>
      <h3>This is the Profile Component</h3>
      {/*       <p>{profileData.data.birthday}</p>
       */}{' '}
    </div>

    /* <Container>
      <Header />
      <h3>Personal Profile</h3>
      <Card>
        <Card.Header>Profile of {user.username}</Card.Header>
        <Container fluid></Container>

        {loading ? <Spinner /> : <ProfileInfo />}
      </Card>

      <UserTimeline />
    </Container> */
  );

  /*  Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
    search: state.search
  }); */
}

export default UserProfile;
