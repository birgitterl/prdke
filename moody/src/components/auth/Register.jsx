import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import FormContainer from '../layout/FormContainerAuth';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ username, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/homesite" />;
  }

  return (
    <FormContainer>
      <h1>Register your account</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength="6"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
