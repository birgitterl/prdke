import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { getFollowersOfProfile } from '../../actions/profile';

const UserProfile = ({
  auth: { isAuthenticated, user },
  search: { profileOfInterest },
  getFollowersOfProfile,
  profile: { followingProfiles }
}) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const profile = profileOfInterest;

  const getFollowersOfProfileOfInterest = async () =>
    getFollowersOfProfile(profile);

  console.log(followingProfiles);
  const isFollowed = async () => followingProfiles.includes(user.username);

  return (
    <Container>
      <h1>{profile.username}</h1>
      <Row>
        <Col className="col-md4-bottom-margin" md={{ span: 6 }}>
          {profile.privacy ? (
            <ListGroup>
              <ListGroup.Item>Wohnort: {profile.hometown}</ListGroup.Item>
              <ListGroup.Item>Geburtstag: {profile.birthday}</ListGroup.Item>
            </ListGroup>
          ) : (
            <p>This account is not visible for the public.</p>
          )}
        </Col>
        <Col>
          {isFollowed ? (
            <Button variant="primary" onClick={getFollowersOfProfileOfInterest}>
              Unfollow
            </Button>
          ) : (
            <Button variant="primary" onClick={getFollowersOfProfileOfInterest}>
              Follow
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  getFollowersOfProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  search: state.search,
  profile: state.profile
});

export default connect(mapStateToProps, { getFollowersOfProfile })(UserProfile);
