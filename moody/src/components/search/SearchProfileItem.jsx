import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Card } from 'react-bootstrap';
import { getProfileByUsername } from '../../actions/search';
import { getFollowRelationship } from '../../actions/profile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SearchProfileItem = ({
  getProfileByUsername,
  getFollowRelationship,
  inputProfile: { username },
  search: { profileOfInterestLoading, profileOfInterest },
  profile: { follows }
}) => {
  const onClick = async () => {
    getProfileByUsername(username);
    getFollowRelationship(username);
  };

  return (
    <Fragment>
      <Col className="col-md4-bottom-margin" md={{ span: 4 }}>
        <Card>
          <Card.Header>
            <h4>{username}</h4>
          </Card.Header>
          <Card.Body>
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
  search: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getFollowRelationship: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  search: state.search,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getFollowRelationship,
  getProfileByUsername
})(SearchProfileItem);
