import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from '../layout/Spinner';
import { getUsersMessages } from '../../actions/messageservice';

const OtherTimeline = ({
  profileOfInterest: { username, privacy },
  posts: { messages, loading },
  profile: { follows },
  getUsersMessages
}) => {
  useEffect(() => {
    getUsersMessages(username);
  }, [getUsersMessages, username]);

  return (
    <Container>
      {privacy || !follows ? (
        <p>You are not allowed to view messages of this profile</p>
      ) : (
        <Card>
          <Card.Header>Last 30 messages of {username}</Card.Header>
          <Container fluid></Container>
          {loading ? (
            <Spinner />
          ) : (
            <ListGroup>
              {messages.length
                ? messages.map((post, index) => (
                    <ListGroupItem key={index}>
                      <h4>{post.text + ' ' + post.emoji}</h4>
                      <p>
                        {`posted on ${post.timestamp.toLocaleDateString()} at ${post.timestamp.toLocaleTimeString()}`}
                      </p>
                    </ListGroupItem>
                  ))
                : `${username} has not yet posted any messages`}
            </ListGroup>
          )}
        </Card>
      )}
    </Container>
  );
};

OtherTimeline.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUsersMessages: PropTypes.func.isRequired,
  profileOfInterest: PropTypes.object.isRequired,
  profileOfInterestLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
  profile: state.profile,
  profileOfInterest: state.search.profileOfInterest,
  profileOfInterestLoading: state.search.profileOfInterestLoading
});

export default connect(mapStateToProps, { getUsersMessages })(OtherTimeline);
