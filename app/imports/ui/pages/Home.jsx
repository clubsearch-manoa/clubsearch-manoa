import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';

/* Renders the Profile Collection as a set of Cards. */
const Home = () => {

  const { ready, clubs } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Clubs.userPublications);
    const sub2 = Meteor.subscribe(Clubs.adminPublications);
    const rdy = sub1.ready() && sub2.ready();
    const clubData = Clubs.collection.find({}).fetch();
    return {
      clubs: clubData,
      ready: rdy,
    };
  }, []);

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    !Roles.userIsInRole(Meteor.userId(), 'admin') ? (
      <Container id={PageIDs.homePage} style={pageStyle}>
        <Row xs={1} md={2} lg={4} className="g-2">
          {clubs.map((club) => <ClubCard key={club._id} club={club} />)}
        </Row>
      </Container>
    ) : (
      <Container id={PageIDs.homePage} style={pageStyle}>
        <Row xs={1} md={2} lg={4} className="g-2">
          <TextField id={ComponentIDs.adminPanelSearchBar} name="search" placeholder="Search for a user..." />
        </Row>
      </Container>
    )
  );
};

export default Home;
