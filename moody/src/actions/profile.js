import socialGraphService from '../utils/socialGraphService';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILEOFINTEREST
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/profiles/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await socialGraphService.post('/profiles', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/homesite');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.msg, status: err.status }
    });
  }
};

//Get specific profile
export async function getProfile(user) {
  try {
    const res = await socialGraphService
      .get('/profiles', {
        username: user
      })
      .then((res) => {
        console.log('Profile retrieved');
      });
    return res;
  } catch (err) {
    console.log(err);
  }
}
