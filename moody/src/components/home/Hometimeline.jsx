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
  profile,
  posts: { messages, loading },
  getOtherMessages
}) => {
  useEffect(() => {
    getOtherMessages();
  }, [getOtherMessages]);
  const onClick = async () => {
    getOtherMessages();
  };

  if (isAuthenticated && profile.loading === true) {
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
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getOtherMessages,
  setAlert
})(Hometimeline);
