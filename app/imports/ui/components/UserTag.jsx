import React, { useState } from 'react';
import Meteor from 'meteor/meteor';
import { Row, Button } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';

/* Component for layout out a toggleable user promotion field. */
const UserTag = ({ user }) => {
  const [isPressed, setIsPressed] = useState(Roles.userIsInRole(user._id, 'clubAdmin'));

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (isPressed) { // promote the user to clubAdmin
      Meteor.call('promoteUser', user._id, 'clubAdmin', (error) => {
        if (error) {
          console.error('Error promoting user:', error);
        }
      });
    } else {
      Meteor.call('demoteUser', user._id, 'clubAdmin', (error) => {
        if (error) {
          console.error('Error demoting user:', error);
        }
      });
    }
  };

  return (
    <Row className="align-items-center justify-content-center mb-3">
      <div className="d-flex align-items-center">
        <input type="text" value={user.username} readOnly className="form-control mr-3" />
        <Button variant={isPressed ? 'outline-dark' : 'light'} onClick={handlePress}>
          {!isPressed ? <Star /> : <StarFill />}
        </Button>
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
