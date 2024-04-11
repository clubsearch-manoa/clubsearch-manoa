import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '40pt' }}>
          Club Search
        </h1>
        <h3 style={{ paddingBottom: '20px', color: 'white' }}>
          Feeling lost? You have come to the right place.
        </h3>
      </Container>
    </div>
    <div className="club-background">
    </div>
  </div>
);

export default Landing;
