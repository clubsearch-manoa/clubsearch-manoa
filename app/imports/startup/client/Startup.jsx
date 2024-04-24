import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import App from '../../ui/layouts/App.jsx';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating default logins for each role');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => {
      const userID = Accounts.createUser({ username: email, email, password: password, role: role });
      if (role === 'admin' || role === 'clubAdmin') {
        Roles.createRole(role, { unlessExists: true });
        Roles.addUsersToRoles(userID, role);
      }
    });
  }
  const root = ReactDOM.createRoot(
    document.getElementById('root'),
  );
  root.render(<App />);
});
