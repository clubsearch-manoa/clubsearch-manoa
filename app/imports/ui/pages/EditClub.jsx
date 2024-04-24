import React from 'react';
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/clubs/Clubs';
import { editClubMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/* Create a schema to specify the structure of the data to appear in the form. */
const bridge = new SimpleSchema2Bridge(Clubs.schema);

/* Renders the Edit CLub Page: what appears when the Club Admin wants to edit a Club. */
const EditClub = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(editClubMethod, data, (error) => {
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
  // Now create the model with all the user information.
  const club = Clubs.collection.findOne({ name });
  const model = _.extend({}, club);
  const transform = (label) => ` ${label}`;
  return ready ? (
    <Container id={PageIDs.editClubPage} className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2>Edit Club</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.editClubFormName} name="name" showInlineError placeholder="Club Name" /></Col>
              </Row>
              <Row>
                <Col xs={6}><TextField id={ComponentIDs.editClubFormImage} name="image" showInlineError placeholder="URL to picture" /></Col>
              </Row>
              <LongTextField id={ComponentIDs.editClubFormDescription} name="description" placeholder="Write a little bit about your club." />
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.editClubFormMeetingTimes} name="meetingTimes" showInlineError placeholder="Meeting Times" /></Col>
              </Row>
              <Row>
                <Col xs={4}><TextField id={ComponentIDs.editClubFormContact} name="contact" showInlineError placeholder="Contact" /></Col>
              </Row>
              <Row>
                <SelectField name="tags" multiple checkboxes transform={transform} />
              </Row>
              <SubmitField id={ComponentIDs.editClubFormSubmit} value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditClub;
