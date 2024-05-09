import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import { Star, StarFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const UserTag = ({ user }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch initial value of isPressed when component mounts
    Meteor.call('isUserInRole', user._id, 'clubAdmin', (error, result) => {
      if (error) {
        swal('Error loading user permissions', error.message, 'error');
      } else {
        setIsPressed(result); // Set initial state
        setLoading(false); // Set loading state to false
      }
    });
  }, []); // Run only once on mount

  const handlePress = () => {
    setIsPressed(!isPressed);
    const action = isPressed ? 'demoteUser' : 'promoteUser';
    Meteor.call(action, user._id, 'clubAdmin', (error) => {
      if (error) {
        swal(`Error ${action === 'promoteUser' ? 'promoting' : 'demoting'} user`, error.message, 'error');
      } else {
        swal('Success', `User ${action === 'promoteUser' ? 'promoted' : 'demoted'} successfully`, 'success');
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return (
    <Row className="align-items-center justify-content-center mb-3">
      <div className="d-flex align-items-center">
        <input type="text" value={user.username} readOnly className="form-control mr-3" />
        <IconButton aria-label="star" color="success" onClick={handlePress}>
          {!isPressed ? <Star /> : <StarFill />}
        </IconButton>
      </div>
    </Row>
  );
};

UserTag.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserTag;
