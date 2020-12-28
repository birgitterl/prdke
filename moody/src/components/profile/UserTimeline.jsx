import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getMyMessages } from '../../actions/messageservice';

const UserTimeline = ({
  auth: { user },
  myposts: { messages, loading },
  getMyMessages
}) => {
  useEffect(() => {
    getMyMessages();
  }, [getMyMessages]);
  return (
    <Container>
      <h3>My messages/post</h3>

      <Card>
        <Card.Header>Messages of {user.username}</Card.Header>
        <Container fluid></Container>

        <ListGroup>
          {messages.map((post, index) => (
            <ListGroupItem key={index}>
              {`${post.text} posted on ${post.timestamp}`}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

UserTimeline.propTypes = {
  getMyMessages: PropTypes.func.isRequired,
  myposts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  myposts: state.myposts,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMyMessages: () => dispatch(getMyMessages())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserTimeline);
