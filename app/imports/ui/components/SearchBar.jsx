import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import _ from 'underscore';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/clubs/Clubs';

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  const fetchData = (value) => {
    try {
      const clubs = Clubs.collection.find().fetch();

      const results = _.filter(clubs, (club) => club.name && club.name.toLowerCase().includes(value.toLowerCase()));

      setResults(results);

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <Container id="search" className="p-3">
      <Search id="searchIcon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Container>
  );
};

// Define propTypes
SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired, // setResults prop should be a function and is required
};

export default SearchBar;
