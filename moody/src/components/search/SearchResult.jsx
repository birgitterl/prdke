import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchProfileItem from './SearchProfileItem';
import SearchMessageItem from './SearchMessageItem';
import { Container, Row } from 'react-bootstrap';

const SearchResult = ({ profiles, messages }) => {
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <h3>Here are the profiles we found</h3>
        </Row>
        <Row md={{ span: 4 }}>
          {profiles.length > 0 ? (
            profiles.map((p) => <SearchProfileItem key={p} inputProfile={p} />)
          ) : (
            <h4>No profiles found...</h4>
          )}
        </Row>
        <Row>
          <h3>Here are the messages we found</h3>
        </Row>
        <Row md={{ span: 4 }}>
          {messages.length > 0 ? (
            messages.map((m) => <SearchMessageItem key={m} inputMessage={m} />)
          ) : (
            <h4>No messages found...</h4>
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

SearchResult.propTypes = {
  profiles: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.search.profiles,
  messages: state.search.messages
});

export default connect(mapStateToProps)(SearchResult);
