import React from 'react';

const Search = () => {
  return (
    <ul>
      <div className="search-container">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </ul>
  );
};

export default Search;
