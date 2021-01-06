import socialGraphService from '../utils/socialGraphService';

import {
  SEARCH_PROFILES,
  GET_PROFILEOFINTEREST,
  SEARCH_ERROR,
  GET_PROFILES
} from './types';

// Get current users profile
export const searchProfiles = (text) => async (dispatch) => {
  dispatch({
    type: SEARCH_PROFILES,
    payload: text
  });
};

// Get profile by username
export const getProfileByUsername = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(`/profiles/${username}`);

    dispatch({
      type: GET_PROFILEOFINTEREST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// Get usernames
export const getProfiles = (queryData) => async (dispatch) => {
  try {
    const query = `username=${queryData}`;
    const res = await socialGraphService.get(`/profiles/?${query}`);
    await dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
