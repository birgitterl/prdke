import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';
import { getOtherMessages } from '../../actions/messageservice';
import Spinner from '../layout/Spinner';

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
                <Row>{post.author}</Row>
                <Col>{`${post.text} posted on ${post.timestamp}`}</Col>
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
