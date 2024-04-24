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
        <Image src={club.image} width={50} />
        <Card.Title>{club.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Description: {club.description}
        </Card.Text>
        <Card.Text>
          {club.tags.map((tag, index) => <Badge key={index} bg="info">{tag}</Badge>)}
        </Card.Text>
        <Card.Text>
          Meeting Times: {club.meetingTimes}
        </Card.Text>
        <Card.Text>
          Contact Info: {club.contact}
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
