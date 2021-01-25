import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import FormContainer from '../layout/FormContainerProfile';
import { Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const initialState = {
  birthday: null,
  hometown: '',
  gender: '',
  privacy: false,
  notifications: false
};

const ProfileForm = ({
  auth: { isAuthenticated },
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  setAlert
}) => {
  const [hometown, setHometown] = useState(initialState.hometown);
  const [birthday, setBirthday] = useState(initialState.birthday);
  const [gender, setGender] = useState(initialState.gender);
  const [privacy, setPrivacy] = useState(initialState.privacy);
  const [background, setBackground] = useState(initialState.background);
  const [notifications, setNotifications] = useState(
    initialState.notifications
  );

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setHometown(profileData.hometown);
      setBirthday(profileData.birthday);
      setGender(profileData.gender);
      setPrivacy(profileData.privacy);
      setNotifications(profileData.notifications);
      setBackground(profileData.backgorund);
    }
  }, [loading, getCurrentProfile, profile]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  const formData = {
    birthday: birthday,
    hometown: hometown,
    gender: gender,
    privacy: privacy,
    notifications: notifications
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (hometown === '' || gender === '' || birthday === null) {
      if (hometown === '') setAlert('Hometown is required', 'danger');
      else if (gender === '') setAlert('Gender is required', 'danger');
      else if (birthday === null) setAlert('Birthday is required', 'danger');
    } else {
      createProfile(formData, history, profile ? true : false);
      history.push('/homesite');
    }
  };

  return (
    <FormContainer>
      <h3>Create or Edit Your Profile</h3>
      <p className="text-red">Required fields are marked with a (*)</p>
      <p></p>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Home Town (*)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your home town"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="birthday">
          <Form.Label>Birthday (*)</Form.Label>
          <Form.Control
            type="date"
            placeholder="Pick your birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender (*)</Form.Label>
          <br />
          <ToggleButtonGroup
            key={gender ? 'loaded' : 'notLoaded'}
            type="radio"
            name="gender"
            className="btn-group-full-width"
            defaultValue={gender}
            value={gender}
            onChange={(e) => setGender(e)}
          >
            <ToggleButton name="gender" variant="primary" value={'female'}>
              Female
            </ToggleButton>
            <ToggleButton name="gender" variant="primary" value={'male'}>
              Male
            </ToggleButton>
            <ToggleButton name="gender" variant="primary" value={'transgender'}>
              Transgender
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>Privacy</Form.Label>
          <Form.Check
            id="switch-1"
            type="switch"
            label="Want your profile to be visible for public?"
            checked={privacy}
            onChange={(e) => setPrivacy(!privacy)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Notifications</Form.Label>
          <Form.Check
            id="switch-2"
            type="switch"
            label="Want to receive notifications if someone mentions you?"
            checked={notifications}
            onChange={(e) => setNotifications(!notifications)}
          />
        </Form.Group>
        <Button type="submit" className="btn-primary-width-full">
          Save
        </Button>
      </Form>
    </FormContainer>
  );
};

ProfileForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  setAlert,
  createProfile,
  getCurrentProfile
})(ProfileForm);
