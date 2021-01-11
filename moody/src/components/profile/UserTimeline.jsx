import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getMyMessages } from '../../actions/messageservice';
import Spinner from '../layout/Spinner';

const UserTimeline = ({
  auth: { user },
  posts: { messages, loading },
  getMyMessages
}) => {
  useEffect(() => {
    getMyMessages();
  }, [getMyMessages]);

  return (
    <Container>
      <h3>My posted messages</h3>
      <Card>
        <Card.Header>Last 30 messages of {user.username}</Card.Header>
        <Container fluid></Container>
        {loading ? (
          <Spinner />
        ) : (
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
        )}
      </Card>
    </Container>
  );
};

UserTimeline.propTypes = {
  getMyMessages: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, { getMyMessages })(UserTimeline);
