import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { setAlert } from '../../actions/alert';
import {
  createFollowRelationship,
  deleteFollowRelationship
} from '../../actions/profile';

const OtherProfileInfo = ({
  auth: { isAuthenticated, user },
  search: { profileOfInterest },
  createFollowRelationship,
  deleteFollowRelationship,
  profile: { follows, profile },
  setAlert
}) => {
  useEffect(() => {}, [
    follows,
    createFollowRelationship,
    deleteFollowRelationship
  ]);
  if (!isAuthenticated || profileOfInterest === null) {
    return <Redirect to="/" />;
  }

  const { username, privacy, hometown, birthday, gender } = profileOfInterest;

  if (user.username === profileOfInterest.username) {
    return <Redirect to="/profile/me" />;
  }
  const onClickFollow = () => {
    if (profile === null) {
      setAlert('Please create your own profile first!', 'danger');
    } else {
      createFollowRelationship(username);
    }
  };

  const onClickUnfollow = () => {
    deleteFollowRelationship(username);
  };

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col className="col-md4-bottom-margin" md={{ span: 6 }}>
            {privacy || follows ? (
              <ListGroup>
                <ListGroup.Item>Hometown: {hometown}</ListGroup.Item>
                <ListGroup.Item>Birthday: {birthday}</ListGroup.Item>
                <ListGroup.Item>Gender: {gender}</ListGroup.Item>
              </ListGroup>
            ) : (
              <p>This account is not visible for the public.</p>
            )}
          </Col>
          {follows ? (
            <Col>
              <Button variant="primary" onClick={onClickUnfollow}>
                Unfollow
              </Button>
            </Col>
          ) : (
            <Col>
              <Button variant="primary" onClick={onClickFollow}>
                Follow
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

OtherProfileInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  createFollowRelationship: PropTypes.func.isRequired,
  deleteFollowRelationship: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  search: state.search,
  profile: state.profile
});

export default connect(mapStateToProps, {
  createFollowRelationship,
  deleteFollowRelationship,
  setAlert
})(OtherProfileInfo);
