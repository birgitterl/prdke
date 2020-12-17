import React from 'react';
import UserTimeline from './UserTimeline';
import Message from './Message';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const Profile = ({ auth: { isAuthenticated } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h3>This is My Personal Profile component</h3>
      <Message />
      <UserTimeline />
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
