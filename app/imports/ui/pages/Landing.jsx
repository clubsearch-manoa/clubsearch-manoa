import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <div className="club-background">
        <Container className="container-btn">
          <div>
            <Button as={Link} to="/browseClubs" variant="primary">Search Here
            </Button>
          </div>
        </Container>
      </div>
    </div>
  </div>
);

export default Landing;
