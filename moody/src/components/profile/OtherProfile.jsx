import React from 'react';
import OtherTimeline from './OtherTimeline';
import OtherProfileInfo from './OtherProfileInfo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';

const OtherProfile = ({
  auth: { isAuthenticated },
  search: { profileOfInterest }
}) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <h3>Welcome to {profileOfInterest.username}'s profile</h3>
      <Container fluid>
        <Row>
          <Col>
            <OtherProfileInfo />
          </Col>
          <Col>
            <OtherTimeline />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

OtherProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  search: state.search
});

export default connect(mapStateToProps)(OtherProfile);
