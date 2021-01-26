import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'react-bootstrap';
import { getOtherMessages } from '../../actions/messageservice';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

const Hometimeline = ({
  auth: { user, isAuthenticated },
  posts: { messages, loading },
  getOtherMessages,
  setAlert
}) => {
  useEffect(() => {
    getOtherMessages();
  }, [getOtherMessages]);
  const onClick = async () => {
    getOtherMessages();
  };

  if (isAuthenticated && user === null) {
    setAlert('User Profile is loading', 'danger');
    return <Spinner />;
  }
  return (
    <Container>
      <h3>Messages of profiles {user.username} follows</h3>
      <Card>
        <Card.Header>
          This are the last 100 posts of profiles I follow
        </Card.Header>
        <Container fluid></Container>
        {loading ? (
          <Spinner />
        ) : (
          <ListGroup>
            {messages.length
              ? messages.map((post, index) => (
                  <ListGroupItem key={index}>
                    <h4>{post.author}</h4>
                    <p>{`${
                      post.text + ' ' + post.emoji
                    } posted on ${post.timestamp.toLocaleDateString()} at ${post.timestamp.toLocaleTimeString()}`}</p>
                  </ListGroupItem>
                ))
              : 'No messages to display'}
          </ListGroup>
        )}
      </Card>
      <Button onClick={onClick}>Refresh Timeline</Button>
    </Container>
  );
};

Hometimeline.propTypes = {
  getOtherMessages: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getOtherMessages,
  setAlert
})(Hometimeline);
