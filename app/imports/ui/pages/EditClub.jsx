import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/clubs/Clubs';
import { updateClubMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  //  _id: String,
  name: { type: String, unique: true },
  image: { type: String, unique: true },
  description: { type: String, unique: true },
  meetingTimes: String,
  contact: { type: String, unique: true },
  tags: Array,
  'tags.$': {
    type: String,
    allowedValues: ['Religion', 'Honor Society', 'Martial Arts', 'Ethnic', 'Other'],
  },
}.isRequired);

/* Renders the Edit CLub Page: what appears when the Club Admin wants to edit a Club. */
const Home = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(updateClubMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Club information updated successfully', 'success');
      }
    });
  };

  const { ready, name } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Clubs.userPublications);
    const sub2 = Meteor.subscribe(Clubs.adminPublications);
    return {
      ready: sub1.ready() && sub2.ready(),
      name: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
  const formSchema = makeSchema();
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const club = Clubs.collection.findOne({ name });
  const model = _.extend({}, club);
  return ready ? (
    <Container id={PageIDs.editPage} className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2>Edit Club</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.editFormName} name="Club Name" showInlineError placeholder="Club Name" /></Col>
              </Row>
              <LongTextField id={ComponentIDs.editFormBio} name="description" placeholder="Write a little bit about your club." />
              <LongTextField id={ComponentIDs.homeFormBio} name="bio" placeholder="Write a little bit about yourself." />
              <Row>
                <Col xs={6}><TextField name="title" showInlineError placeholder="Title" /></Col>
                <Col xs={6}><TextField name="image" showInlineError placeholder="URL to picture" /></Col>
              </Row>
              <Row>
                <Col xs={6}><SelectField name="interests" showInlineError multiple /></Col>
                <Col xs={6}><SelectField name="projects" showInlineError multiple /></Col>
              </Row>
              <SubmitField id={ComponentIDs.editFormSubmit} value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default Home;
