import React from 'react';
import { Badge, Card, Image, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Returns the Club with the passed user name. Implement as needed. */
// function getClubData(name) {
//   const data = Clubs.collection.findOne({ name });
//   return _.extend({}, data);
// }

/* Component for layout out a Profile Card. */
const ClubCard = ({ club }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={club.image} width={100} height={100} />
        <Card.Title><b>{club.name}</b></Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Description:</b> {club.description}
        </Card.Text>
        <Card.Text>
          {club.tags.map((tag, index) => <Badge key={index} bg="info">{tag}</Badge>)}
        </Card.Text>
        <Card.Text>
          <b>Meeting Times:</b> {club.meetingTimes}
        </Card.Text>
        <Card.Text>
          <b>Contact Info:</b> {club.contact}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    meetingTimes: PropTypes.string,
    contact: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ClubCard;
