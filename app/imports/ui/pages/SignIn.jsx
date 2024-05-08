import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row, Image } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Roles } from 'meteor/alanning:roles';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return Roles.userIsInRole(Meteor.userId(), 'clubAdmin') ?
      (<Navigate to="/editclub" />) :
      (<Navigate to="/browseclubs" />);
  }

  return (
    <Container id={PageIDs.signInPage}>
      <Image src="https://manoa.hawaii.edu/news/attachments/img10896_10743l.jpg" alt="manoa-rainbow pic" className="signin-background" />
      <Row className="justify-content-center">
        <Col xs={9}>
          <Col className="text-center mt-5">
            <h2 style={{ fontSize: '30px', color: 'white' }}> Login To ClubSearch </h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={ComponentIDs.signInFormEmail} name="email" placeholder="E-mail address" inputClassName="w-100" />
                <TextField id={ComponentIDs.signInFormPassword} name="password" placeholder="Password" type="password" inputClassName="w-100" />
                <ErrorsField />
                <SubmitField id={ComponentIDs.signInFormSubmit} />
              </Card.Body>
            </Card>
          </AutoForm>

          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful. Please try again...</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;