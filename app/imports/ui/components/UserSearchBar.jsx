import React, { useState, useEffect } from 'react';
import { Search } from 'react-bootstrap-icons';
import _ from 'underscore';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

const UserSearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  const fetchData = (value) => {
    try {
      const users = Meteor.users.find().fetch();

      let results = [];
      // if search is empty, display all users
      if (value === '') results = users;
      // otherwise display relevant users
      else results = _.filter(users, (user) => user.username && user.username.toLowerCase().includes(value.toLowerCase()));

      setResults(results);

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Make an empty search call on page load to display all users
  useEffect(() => {
    fetchData(''); // Call fetchData with an empty value when component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <Container id="search" className="p-3">
      <Search id="searchIcon" />
      <input
        className="search-input"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Container>
  );
};

// Define propTypes
UserSearchBar.propTypes = {
  setResults: PropTypes.func.isRequired, // setResults prop should be a function and is required
};

export default UserSearchBar;
