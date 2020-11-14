import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  birthday: '',
  hometown: '',
  gender: '',
  privacy: '',
  notifications: '',
  background: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    birthday,
    hometown,
    gender,
    privacy,
    notifications,
    background
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
    history.push('/hometimeline');
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>

      <medium>* = required field</medium>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <h4>Hometown</h4>
          <input
            type="text"
            placeholder="Hometown"
            name="hometown"
            value={hometown}
            onChange={onChange}
          />
          <small className="form-text">
            Let us know where you currently live.
          </small>
        </div>
        <div className="form-group">
          <h4>Birthday</h4>
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={onChange}
          />
          <small className="form-text">When is your birthday?</small>
        </div>
        <div className="form-group">
          <h4>Gender</h4>
          <select name="gender" value={gender} onChange={onChange}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="transgender">transgender</option>
          </select>
          <small className="form-text">Let us know your gender</small>
        </div>
        <div className="form-group">
          <h4>* Privacy Settings</h4>
          <select name="privacy" value={privacy} onChange={onChange}>
            <option value="public">Visible for public</option>
            <option value="private">Not visible for public</option>
          </select>
          <small className="form-text">Let us know your privacy settings</small>
        </div>
        <div className="form-group">
          <h4>* Notification Settings</h4>
          <select
            name="notifications"
            value={notifications}
            onChange={onChange}
          >
            <option value="true">Notifications enabled</option>
            <option value="false">Notifications disabled</option>
          </select>
          <small className="form-text">
            Let us know your notification settings
          </small>
        </div>
        <div className="form-group">
          <h4>* Select your background</h4>
          <input
            type="text"
            placeholder="background"
            name="background"
            value={background}
            onChange={onChange}
          />
          <small className="form-text">
            Let us know where you currently live.
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
