import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchItem from './SearchItem';
import { Container, Row } from 'react-bootstrap';

const SearchResult = ({ profiles }) => {
  return (
    <Fragment>
      <h3>Here are your search results</h3>
      {profiles.forEach((p) => console.log(p.username))}
      <Container fluid>
        <Row md={{ span: 4 }}>
          {profiles.length > 0 ? (
            profiles.map((p) => <SearchItem key={p} inputProfile={p} />)
          ) : (
            <h4>No profiles found...</h4>
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

SearchResult.propTypes = { profiles: PropTypes.array.isRequired };

const mapStateToProps = (state) => ({
  profiles: state.search.profiles
});

export default connect(mapStateToProps)(SearchResult);
