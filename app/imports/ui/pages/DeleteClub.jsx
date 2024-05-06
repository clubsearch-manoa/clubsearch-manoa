import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, TextField, SubmitField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { deleteClubMethod } from '../../startup/both/Methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Clubs } from '../../api/clubs/Clubs';

const makeSchema = () => new SimpleSchema({
  name: String,
});
const DeleteClub = () => {

  const submit = (data, formRef) => {
    Meteor.call(deleteClubMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Club deleted successfully', 'success').then(() => formRef.reset());
      }
    });
  };

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Clubs.adminPublications);
    return {
      ready: sub1.ready(),
    };
  }, []);
  let fRef = null;
  const formSchema = makeSchema();
  const bridge = new SimpleSchema2Bridge(formSchema);
  return ready ? (
    <Container style={pageStyle}>
      <Row id={PageIDs.deleteClubPage} className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <h1>Delete Club</h1>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={4}><TextField id={ComponentIDs.deleteClubName} name="name" showInlineError placeholder="Club name" /></Col>
                </Row>
                <SubmitField id={ComponentIDs.deleteClubFormSubmit} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default DeleteClub;
