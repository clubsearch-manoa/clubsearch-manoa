import React, { useState } from 'react';

const UserList = () => {
  const [query, setQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const pullMatchingUsers = (event) => {
    event.preventDefault();
    const matchingUsers = Meteor.users.find({ /* Your query here */ }).fetch();
    setAllUsers(matchingUsers);
  };

