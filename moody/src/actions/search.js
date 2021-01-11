import socialGraphService from '../utils/socialGraphService';

import {
  SEARCH_PROFILES,
  SEARCH_MESSAGES,
  SEARCH_HASHTAGS,
  GET_PROFILEOFINTEREST,
  SEARCH_ERROR,
  CLEAR_SEARCH,
  SET_SEARCH_TEXT
} from './types';

// Get current users profile
export const setText = (text) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TEXT,
    payload: text
  });
};

// Get profile by username
export const getProfileByUsername = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(`/profiles/${username}`);

    await dispatch({
      type: GET_PROFILEOFINTEREST,
      payload: res.data
    });
    dispatch({
      type: CLEAR_SEARCH
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// @TODO: search should fetch data from elastic
export const searchItems = (queryData) => async (dispatch) => {
  try {
    const queryProfiles = `username=${queryData}`;
    const resProfiles = await socialGraphService.get(
      `/profiles/?${queryProfiles}`
    );

    dispatch({
      type: SEARCH_PROFILES,
      payload: resProfiles.data
    });

    const queryMessages = `search=${queryData}`;
    const resMessages = await socialGraphService.get(
      `/messages/search?${queryMessages}`
    );
    dispatch({
      type: SEARCH_MESSAGES,
      payload: resMessages.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const clearSearch = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH
  });
};
