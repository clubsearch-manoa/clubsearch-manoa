import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';

function getUserData(email) {
  const data = Clubs.collection.findOne({ email });
  return _.extend({}, data);
}
const UserHome = () => {

  const { ready } = useTracker(() => {
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

  const emails = _.pluck(Clubs.collection.find().fetch(), 'favorites');
  const favoriteData = emails.map(email => getUserData(email));
  const favorites = _.sample(favoriteData);

  return ready ? (
    <Container id={PageIDs.userHomePage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        <ClubCard club={favorites} />
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserHome;
