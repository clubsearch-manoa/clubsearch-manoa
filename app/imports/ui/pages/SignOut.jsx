import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Image, Container } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container id={PageIDs.signOutPage}>
      <Image src="https://manoa.hawaii.edu/news/attachments/img10896_10743l.jpg" alt="manoa-rainbow pic" className="signin-background" />
      <Row className="justify-content-center">
        <Col xs={9}>
          <Col className="text-center mt-5" style={{ color: 'white' }}>
            <h2 style={{ fontSize: '70px', paddingTop: '80px', fontFamily: 'Impact', textShadow: '2px 2px 0px black' }}>
              Come search again soon!
            </h2>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOut;
