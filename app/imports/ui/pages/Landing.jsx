import React from 'react';
import { Container } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <div className="club-background">
        <Container className="container-btn">
          <h3 style={{ paddingTop: '10px', color: 'white', fontSize: '40pt' }}>
            Search Here
          </h3>
        </Container>
      </div>
    </div>
  </div>
);

export default Landing;
