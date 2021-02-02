import socialGraphService from '../utils/socialGraphService';
import { setAlert } from './alert';

import {
  FOLLOWS_ERROR,
  GET_FOLLOWS,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from './types';

// Get current users profile
//--> DONE
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/profiles/me');
    delete res.data['status'];

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });
  } catch (err) {
    const error = err.response.data;
    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Create or update profile
//--> DONE
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await socialGraphService.post('/profiles', formData);
    delete res.data['status'];
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/homesite');
    }
  } catch (err) {
    const error = err.response.data;

    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Get followers of current user
// --> DONE
export const getFollowRelationship = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(`/follow/${username}`);
    delete res.data['status'];
    dispatch({
      type: GET_FOLLOWS,
      payload: res.data.following
    });
  } catch (err) {
    const error = err.response.data;
    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    }
    dispatch({
      type: FOLLOWS_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Create a follower relationship
// --> DONE
export const createFollowRelationship = (username) => async (dispatch) => {
  try {
    await socialGraphService.post(`/follow/${username}`);
    dispatch(getFollowRelationship(username));
  } catch (err) {
    const error = err.response.data;
    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    }
    dispatch({
      type: FOLLOWS_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// unfollow a profile
// --> DONE
export const deleteFollowRelationship = (username) => async (dispatch) => {
  try {
    await socialGraphService.delete(`/follow/${username}`);
    dispatch(getFollowRelationship(username));
  } catch (err) {
    const error = err.response.data;
    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    }
    dispatch({
      type: FOLLOWS_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};
