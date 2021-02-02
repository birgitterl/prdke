import socialGraphService from '../utils/socialGraphService';
import searchService from '../utils/searchService';
import { setAlert } from './alert';

import {
  SEARCH_PROFILES,
  SEARCH_MESSAGES,
  GET_PROFILEOFINTEREST,
  SEARCH_ERROR,
  MESSAGE_SEARCH_ERROR,
  PROFILE_SEARCH_ERROR,
  CLEAR_SEARCH,
  SET_SEARCH_TEXT
} from './types';

// Get current users profile
// --> DONE
export const setText = (text) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TEXT,
    payload: text
  });
};

// Get profile by username
// --> DONE
export const getProfileByUsername = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(`/profiles/${username}`);
    delete res.data['status'];

    await dispatch({
      type: GET_PROFILEOFINTEREST,
      payload: res.data.profile
    });
    dispatch({
      type: CLEAR_SEARCH
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
      type: SEARCH_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// search for messages by string
// --> DONE
export const searchMessages = (queryData) => async (dispatch) => {
  try {
    const queryMessages = `text=${queryData}`;
    const resMessages = await socialGraphService.get(
      `/search/messages?${queryMessages}`
    );
    delete resMessages.data['status'];

    dispatch({
      type: SEARCH_MESSAGES,
      payload: resMessages.data.messages
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
      type: MESSAGE_SEARCH_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};
// search for profiles by string
// --> DONE
export const searchProfiles = (queryData) => async (dispatch) => {
  try {
    const queryProfiles = `username=${queryData}`;
    const resProfiles = await searchService.get(
      `/search/profiles?${queryProfiles}`
    );
    delete resProfiles.data['status'];

    dispatch({
      type: SEARCH_PROFILES,
      payload: resProfiles.data.profiles
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
      type: PROFILE_SEARCH_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// --> DONE
export const clearSearch = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH
  });
};
