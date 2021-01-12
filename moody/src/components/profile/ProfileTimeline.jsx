import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from '../layout/Spinner';
import { getMessages } from '../../actions/messageservice';

const ProfileTimeline = ({
  search: { profileOfInterest },
  posts: { messages },
  getMessages
}) => {
  const { username } = profileOfInterest;

  return (
    <Card>
      <Card.Header>Last 30 messages of {username}</Card.Header>
      <Container fluid></Container>
      <ListGroup>
        {messages.map((post, index) => (
          <ListGroupItem key={index}>
            <h4>{post.text + ' ' + post.emoji}</h4>
            <p>
              {`posted on ${post.timestamp.toLocaleDateString()} at ${post.timestamp.toLocaleTimeString()}`}
            </p>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
};

ProfileTimeline.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getMessages })(ProfileTimeline);
