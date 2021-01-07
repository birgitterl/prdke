import React from 'react';
import UserTimeline from './UserTimeline';
import Message from './Message';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { Container, Col, Row } from 'react-bootstrap';

const Profile = ({ auth: { isAuthenticated } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h3>This is My Personal Profile component</h3>
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
