import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Hometimeline from './Hometimeline';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Homesite = ({
  getCurrentProfile,
  auth: { user, isAuthenticated },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h1>Welcome {user && user.username}</h1>
          </Row>
          <p />
          <Row className="justify-content-md-center">
            <p className="text-large text-primary">
              What's going on out there...
            </p>
          </Row>
          <p></p>
          {profile !== null ? (
            <Row className="justify-content-md-center">
              <Hometimeline />
            </Row>
          ) : (
            <>
              <Row className="justify-content-md-center">
                <p className="text-lead text-primary">
                  You have not yet setup a profile, please add some info
                </p>
              </Row>
              <Row className="justify-content-md-center">
                <Link to="/profileform" className="btn btn-primary">
                  Create Your Profile
                </Link>
              </Row>
            </>
          )}
        </Container>
      )}
    </Fragment>
  );
};

Homesite.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Homesite);
