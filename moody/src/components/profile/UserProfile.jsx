<<<<<<< HEAD
/* import React, { Fragment, useEffect } from 'react';
=======
import React, { Fragment, useEffect } from 'react';
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import UserTimeline from './UserTimeline';
import Header from '../layout/Header';
import { Container } from 'react-bootstrap';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import profileOfInterest from '../search';

const UserProfile = ({
  auth: { isAuthenticated },
  search: { profileOfInterest }
}) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Header />
      <h3>Personal Profile</h3>
      <Card>
        <Card.Header>Profile of {user.username}</Card.Header>
        <Container fluid></Container>

        {loading ? <Spinner /> : <ProfileInfo />}
      </Card>

      <UserTimeline />
    </Container>
  );

  Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    auth: state.auth,
    search: state.search
  });
};

export default UserProfile;
<<<<<<< HEAD
 */
=======
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745
