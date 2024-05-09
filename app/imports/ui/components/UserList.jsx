import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserTag from './UserTag';

const UserList = ({ results }) => (
  <Container className="p-1">
    <Row xs={1} md={2} lg={4} className="g-2">
      {results.map((user) => <UserTag key={user._id} user={user} />)}
    </Row>
  </Container>
);
UserList.propTypes = {
  results: PropTypes.arrayOf(Object).isRequired, // setResults prop should be a function and is required
};

export default UserList;
