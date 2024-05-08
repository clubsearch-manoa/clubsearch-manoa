import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ClubCard from './ClubCard';

const SearchResultsList = ({ results }) => (
  <Container className="p-1">
    <Row xs={1} md={2} lg={4} className="g-2">
      {results.map((club) => <ClubCard key={club._id} club={club} />)}
    </Row>
  </Container>
);

SearchResultsList.propTypes = {
  results: PropTypes.arrayOf(Object).isRequired, // setResults prop should be a function and is required
};

export default SearchResultsList;
