import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from '../../img/logo.svg';

const Header = ({
  auth: { isAuthenticated, user },
  profile: { profile },
  logout
}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-center"
          />{' '}
          moody
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isAuthenticated && user != null && profile == null ? (
              <NavDropdown title={user.username} id="username">
                <LinkContainer to="/profileform">
                  <NavDropdown.Item>Create Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logout} href="/">
                  <i className="fas fa-sign-out-alt"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : isAuthenticated && user != null && profile != null ? (
              <NavDropdown title={user.username} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profileform">
                  <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logout} href="/">
                  <i className="fas fa-sign-out-alt"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout })(Header);
