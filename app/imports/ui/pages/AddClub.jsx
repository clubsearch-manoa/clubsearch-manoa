import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { addClubMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Clubs } from '../../api/clubs/Clubs';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allTags) => new SimpleSchema({
  name: String,
  image: String,
  description: String,
  meetingTimes: String,
  contact: String,
  tags: { type: Array, label: 'Tags', optional: false },
  'tags.$': { type: String, allowedValues: allTags },
});

/* Renders the Page for adding a project. */
const AddClub = () => {

  /* On submit, insert the data. */
  const submit = (data, formRef) => {
    Meteor.call(addClubMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Club added successfully', 'success').then(() => formRef.reset());
      }
    });
  };

  const { ready, tags } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const subscription = Meteor.subscribe(Clubs.adminPublications);
    return {
      ready: subscription.ready(),
      tags: Clubs.collection.find().fetch(),
    };
  }, []);

  let fRef = null;
  const allTags = _.pluck(tags, 'type');
  const formSchema = makeSchema(allTags);
  const bridge = new SimpleSchema2Bridge(formSchema);
  const transform = (label) => ` ${label}`;
  /* Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  return ready ? (
    <Container style={pageStyle}>
      <Row id={PageIDs.addClubPage} className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Club</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField id={ComponentIDs.addClubFormName} name="name" showInlineError placeholder="Club Name" /></Col>
                  <Col xs={6}><TextField id={ComponentIDs.addClubFormImage} name="image" showInlineError placeholder="Upload a Club Logo/Photo" /></Col>
                </Row>
                <LongTextField id={ComponentIDs.addClubFormDescription} name="description" placeholder="Describe the club here!" />
                <Row className="p-1">
                  <Col xs={6}>
                    <SelectField id={ComponentIDs.addClubFormTags} name="tags" showInlineError placeholder="Tags" multiple checkboxes transform={transform} />
                  </Col>
                  <Col xs={6}>
                    <Col xs={10}><TextField id={ComponentIDs.addClubFormContact} name="contact" showInlineError placeholder="Provide a way to contact!" /></Col>
                  </Col>
                  <Col xs={6}>
                    <Col xs={10}><TextField id={ComponentIDs.addClubFormMeetingTimes} name="meetingTimes" showInlineError placeholder="Provide club meeting times!" /></Col>
                  </Col>
                </Row>
                <SubmitField id={ComponentIDs.addClubFormSubmit} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AddClub;