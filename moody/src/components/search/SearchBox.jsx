import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { searchProfiles, getProfiles } from '../../actions/search';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const SearchBox = ({
  getProfiles,
  searchProfiles,
  search: { text, profilesLoading }
}) => {
  const onChange = (e) => {
    searchProfiles(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getProfiles(text);
  };

  return (
    <div>
      <Form id="searchForm" onSubmit={onSubmit} inline>
        <Form.Control
          type="text"
          name="searchText"
          placeholder="Search Friends, Messages..."
          className="mr-sm-2 ml-sm-5"
          onChange={onChange}
        />
        <Button type="submit" variant="outline-primary" className="p-2">
          Search
        </Button>
      </Form>
      {!profilesLoading && <Redirect to="/searchresult" />}
    </div>
  );
};

SearchBox.propTypes = {
  searchProfiles: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  search: state.search
});

export default connect(mapStateToProps, { getProfiles, searchProfiles })(
  SearchBox
);
