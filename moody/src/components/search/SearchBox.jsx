import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { setText, searchMessages, searchProfiles } from '../../actions/search';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Fragment } from 'react';

const SearchBox = ({
  searchMessages,
  searchProfiles,
  setText,
  search: { text, profilesLoading, messagesLoading }
}) => {
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchMessages(text);
    searchProfiles(text);
    document.getElementById('searchForm').reset();
  };

  return (
    <Fragment>
      <Form id="searchForm" onSubmit={onSubmit} inline>
        <Form.Control
          type="text"
          name="searchText"
          placeholder="Search for Friends, Messages..."
          className="mr-sm-2 ml-sm-5"
          onChange={onChange}
        />
        <Button type="submit" variant="outline-primary" className="p-2">
          Search
        </Button>
      </Form>
      {!profilesLoading && !messagesLoading && <Redirect to="/searchresult" />}
    </Fragment>
  );
};

SearchBox.propTypes = {
  setText: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  searchMessages: PropTypes.func.isRequired,
  searchProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  search: state.search
});

export default connect(mapStateToProps, {
  searchMessages,
  searchProfiles,
  setText
})(SearchBox);
