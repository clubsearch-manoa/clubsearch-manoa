import React from 'react';
import { Container } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="club-background">
      <div className="landing-green-background">
        <Container className=" text-center">
          <h2 style={{ paddingTop: '20px', color: 'white', fontSize: '40pt' }}>
            Club Search
          </h2>
          <h3 style={{ paddingBottom: '20px', color: 'white' }}>
            Feeling lost? You have come to the right place.
          </h3>
        </Container>
      </div>
    </div>
  </div>
);

export default Landing;
