import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Button } from 'react-bootstrap';
import Spinner from './Spinner';

const Landing = ({ auth: { isAuthenticated, loading } }) => {
  if (isAuthenticated) {
    return <Redirect to="/homesite" />;
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1>Welcome to moody</h1>
          </Row>
          <Row className="justify-content-md-center">
            <h4>Create a profile, share your mood and follow your friends</h4>
          </Row>
          <p />
          <Row className="justify-content-md-center">
            <Button
              className="btn-primary-width"
              variant="primary"
              href="/login"
            >
              Sign In
            </Button>
            <Button
              className="btn-primary-width"
              variant="primary"
              href="/register"
            >
              Register
            </Button>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
