import socialGraphService from '../utils/socialGraphService';
import searchService from '../utils/searchService';

import {
  SEARCH_PROFILES,
  SEARCH_MESSAGES,
  SEARCH_HASHTAGS,
  GET_PROFILEOFINTEREST,
  SEARCH_ERROR,
  MESSAGE_SEARCH_ERROR,
  PROFILE_SEARCH_ERROR,
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

export const searchMessages = (queryData) => async (dispatch) => {
  try {
    const queryMessages = `text=${queryData}`;
    const resMessages = await socialGraphService.get(
      `/search/messages?${queryMessages}`
    );
    dispatch({
      type: SEARCH_MESSAGES,
      payload: resMessages.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_SEARCH_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

export const searchProfiles = (queryData) => async (dispatch) => {
  try {
    const queryProfiles = `username=${queryData}`;
    const resProfiles = await searchService.get(
      `/search/profiles?${queryProfiles}`
    );

    dispatch({
      type: SEARCH_PROFILES,
      payload: resProfiles.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_SEARCH_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

export const clearSearch = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH
  });
};
