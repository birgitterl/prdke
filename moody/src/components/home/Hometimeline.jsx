import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getOtherMessages } from '../../actions/messageservice';
import Spinner from '../layout/Spinner';
import { NavLink } from 'react-router-dom';

const Hometimeline = ({
  auth: { user },
  posts: { messages, loading },
  getOtherMessages
}) => {
  useEffect(() => {
    getOtherMessages();
  }, [getOtherMessages]);

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
            {messages.map((post, index) => (
              <ListGroupItem key={index}>
                <h4>
                  <NavLink to={`/profile/${post.author}`}>
                    {post.author}
                  </NavLink>
                </h4>
                <p>{`${
                  post.text + ' ' + post.emoji
                } posted on ${post.timestamp.toLocaleDateString()} at ${post.timestamp.toLocaleTimeString()}`}</p>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Card>
    </Container>
  );
};

Hometimeline.propTypes = {
  getOtherMessages: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, { getOtherMessages })(Hometimeline);
