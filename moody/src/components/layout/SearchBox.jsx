import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  return (
    <Form inline>
      <Form.Control
        type="text"
        name="search"
        placeholder="Search..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-primary" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
