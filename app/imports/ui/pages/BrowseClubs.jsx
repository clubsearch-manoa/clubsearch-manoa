import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';

/* Renders the Profile Collection as a set of Cards. */
const BrowseClubs = () => {

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
  return ready ? (
    <Container id={PageIDs.browseClubs} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {clubs.map((club) => <ClubCard key={club._id} club={club} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BrowseClubs;
