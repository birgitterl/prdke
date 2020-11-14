import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Search from './Search';

const Navbar = ({
  auth: { isAuthenticated },
  profile: { profile, loading },
  logout
}) => {
  const authLinks = (
    <Fragment>
      <Search />
      <ul>
        <li>
          <a onClick={logout} href="/">
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm"> Logout</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const profileLinks = (
    <Fragment>
      <Search />
      <ul>
        <li>
          <Link to="/profileform" className="btn btn-primary my-1">
            Edit Profile
          </Link>
        </li>
        <li>
          <a onClick={logout} href="/">
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm"> Logout</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">
          <i class="fas fa-sign-in-alt" />
          <span>Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <span>moody</span>
        </Link>
      </h1>
      <Fragment>
        {isAuthenticated && (profile || loading)
          ? profileLinks
          : isAuthenticated && !profile
          ? authLinks
          : guestLinks}
      </Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout })(Navbar);
