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
            <Button
              as={Link}
              to="/browseClubs"
              variant="primary"
              style={{ backgroundColor: 'var(--bowfolio-navbar-bg)', color: 'white', fontSize: '18px', padding: '10px 20px' }}
              size="lg"
            >Search Here
            </Button>
          </div>
        </Container>
      </div>
    </div>
  </div>
);

export default Landing;
