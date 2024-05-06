import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <div className="club-background">
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Button
            as={Link}
            to="/browseClubs"
            variant="primary"
            style={{
              backgroundColor: 'var(--bowfolio-navbar-bg)',
              color: 'white',
              fontSize: '30px',
              padding: '40px 60px',
              fontFamily: 'Impact',
              textShadow: '2px 2px 0px black',
            }}
            size="lg"
          >
            Search Here
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
