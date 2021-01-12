import socialGraphService from '../utils/socialGraphService';
import { setAlert } from './alert';

import {
  GET_FOLLOWS,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE
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
// Get followers of current user
export const getFollowRelationship = (username) => async (dispatch) => {
  console.log(username);
  try {
    const res = await socialGraphService.get(`/follow/${username}`);
    console.log(res.data.following);
    dispatch({
      type: GET_FOLLOWS,
      payload: res.data.following
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

export const createFollowRelationship = (user) => async (dispatch) => {
  const body = { username: user };
  try {
    const res = await socialGraphService.post('/follow', body);
    dispatch(getFollowRelationship(user));
  } catch (err) {
    console.log(err.msg);
  }
};

export const deleteFollowRelationship = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.delete(`/follow/${username}`);
    dispatch(getFollowRelationship(username));
  } catch (err) {
    console.log(err);
  }
};

//Get specific profile
/*export async function getProfile(user) {
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
}*/

/*export const getFollowersOfProfile = (user) => async (dispatch) => {
  try {
    const res = await socialGraphService.post('/follow/followers', {
      body: {
        user: user
      }
    });

    console.log(res);

    dispatch({
      type: GET_FOLLOWERS_OF_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};*/
