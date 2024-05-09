import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
// import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';
import UserList from '../components/UserList';
import UserSearchBar from '../components/UserSearchBar';

function getUserData(email) {
  const data = Clubs.collection.findOne({ email });
  return _.extend({}, data);
}

/* Renders the Home Page: what appears after the user logs in. */
const Home = () => {
  const [results, setResults] = useState([]);

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Clubs.userPublications);
    const sub2 = Meteor.subscribe(Clubs.adminPublications);
    const sub3 = Meteor.subscribe('allUsers');
    const rdy = sub1.ready() && sub2.ready() && sub3.ready();
    const clubData = Clubs.collection.find({}).fetch();
    const userData = Meteor.users.find({}).fetch();
    return {
      clubs: clubData,
      users: userData,
      ready: rdy,
    };
  }, []);

  const emails = _.pluck(Clubs.collection.find().fetch(), 'favorited');
  const favoriteData = emails.map(email => getUserData(email));
  const favorites = _.sample(favoriteData);

  if (!ready) {
    return <LoadingSpinner />;
  }
  return (
    !Roles.userIsInRole(Meteor.userId(), 'admin') ? (
      <Container id={PageIDs.homePage} style={pageStyle}>
        <Row xs={1} md={2} lg={4} className="g-2">
          <ClubCard club={favorites} />
        </Row>
      </Container>
    ) : (
      <Container id={PageIDs.homePage} className="p-1">
        <Col>
          <h2>Promote and Demote Users</h2>
          <Card>
            <Card.Header>
              <Container>
                <UserSearchBar setResults={setResults} />
              </Container>
            </Card.Header>
            <Card.Body>
              <Container>
                <UserList results={results} />
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    )
  );
};

export default Home;
