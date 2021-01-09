import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Card } from 'react-bootstrap';
import { getProfileByUsername } from '../../actions/search';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SearchMessageItem = ({ inputMessage: { author, text, timestamp } }) => {
  return (
    <Fragment>
      <Col className="col-md4-bottom-margin" md={{ span: 4 }}>
        <Card>
          <Card.Body>
            <Card.Title>{author}</Card.Title>
            <Card.Text>{text}</Card.Text>
            <Card.Text>{timestamp}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

SearchMessageItem.propTypes = {
  inputProfile: PropTypes.object.isRequired,
  getProfileByUsername: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  search: state.search
});

export default connect(mapStateToProps, { getProfileByUsername })(
  SearchMessageItem
);
