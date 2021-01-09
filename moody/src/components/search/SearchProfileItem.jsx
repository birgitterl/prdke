import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Card } from 'react-bootstrap';
import { getProfileByUsername } from '../../actions/search';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SearchProfileItem = ({
  getProfileByUsername,
  inputProfile: { username },
  search: { profileOfInterestLoading, profileOfInterest }
}) => {
  const onClick = async () => {
    getProfileByUsername(username);
  };

  return (
    <Fragment>
      <Col className="col-md4-bottom-margin" md={{ span: 4 }}>
        <Card>
          <Card.Body>
            <Card.Title>{username}</Card.Title>
            <Card.Text>Visit the profile of {username}</Card.Text>
            <Button
              className="btn-primary-width-full"
              variant="primary"
              onClick={onClick}
            >
              View Profile
            </Button>
          </Card.Body>
        </Card>
      </Col>
      {!profileOfInterestLoading && (
        <Redirect to={`/profile/${profileOfInterest.username}`} />
      )}
    </Fragment>
  );
};

SearchProfileItem.propTypes = {
  inputProfile: PropTypes.object.isRequired,
  getProfileByUsername: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  search: state.search
});

export default connect(mapStateToProps, { getProfileByUsername })(
  SearchProfileItem
);
