import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { Roles } from 'meteor/alanning:roles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = loggedIn ? 'bg-dark' : 'bg-light';
  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/cropped-Manoa-Logo-300x300.png" width={50} style={{ marginBottom: 3 }} /> Club Search</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([ //This is going to be a default for when the admin and club admin profiles are made, the navlinks work for now in just a current user
              <Nav.Link as={NavLink} id={ComponentIDs.homeMenuItem} to="/home" key="home" index> Home </Nav.Link>,
              <Nav.Link id={PageIDs.addClub} as={NavLink} to="/addclub" key="addclub">Add Club</Nav.Link>,
              <Nav.Link id={PageIDs.browseClubs} as={NavLink} to="/browseclubs" key="browseclubs">Browse Clubs</Nav.Link>,
              <Nav.Link id={PageIDs.editClub} as={NavLink} to="/editclub" key="editclub">Edit Club</Nav.Link>,
            ]) : ''}
            {/*{currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') ? ([*/}
            {/*  <Nav.Link id={PageIDs.addClub} as={NavLink} to="/addclub" key="addclub">Add Club</Nav.Link>,*/}
            {/*  <Nav.Link id={PageIDs.browseClubs} as={NavLink} to="/browseclubs" key="browseclubs">Browse Clubs</Nav.Link>,*/}
            {/*]) : ''}*/}
            {/*{currentUser && Roles.userIsInRole(Meteor.userId(), 'clubadmin') ? ([*/}
            {/*  <Nav.Link id={PageIDs.editClub} as={NavLink} to="/editclub" key="editclub">Edit Club</Nav.Link>,*/}
            {/*  <Nav.Link id={PageIDs.browseClubs} as={NavLink} to="/browseclubs" key="browseclubs">Browse Clubs</Nav.Link>,*/}
            {/*]) : ''}*/}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
