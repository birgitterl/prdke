import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'react-bootstrap';
import { getProfileByUsername } from '../../actions/search';
import { connect } from 'react-redux';

const SearchMessageItem = ({
  inputMessage: { author, text, emoji, timestamp }
}) => {
  const msg = text + ' ' + emoji;
  const date = new Date(timestamp);
  return (
    <Fragment>
      <Col className="col-md4-bottom-margin" md={{ span: 4 }}>
        <Card>
          <Card.Header>
            <h4>{author}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title>{msg}</Card.Title>
            <Card.Text>
              <p>
                {`posted on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`}
              </p>
            </Card.Text>
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
