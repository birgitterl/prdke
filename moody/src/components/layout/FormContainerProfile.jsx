import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainerAuth = ({ children }) => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainerAuth;
