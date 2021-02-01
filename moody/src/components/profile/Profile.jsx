import React from 'react';
import UserTimeline from './UserTimeline';
import Message from './Message';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { Fragment } from 'react';

const Profile = ({ auth: { isAuthenticated } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <h3>This is My Personal Profile</h3>
      <Container fluid>
        <Row>
          <Col>
            <Message />
          </Col>
          <Col>
            <UserTimeline />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
