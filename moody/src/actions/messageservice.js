// User timeline = Fetch my messages, Home timeline = Fetch messages of a profile I follow

import socialGraphService from '../utils/socialGraphService';

import {
  GET_MY_MESSAGES,
  GET_OTHER_MESSAGES,
  GET_MESSAGES_FOLLOWED_PROFILE,
  MESSAGE_ERROR
} from './types';

// Get the users current messages
export const getMyMessages = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/messages/my');

    dispatch({
      type: GET_MY_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// Get the last 25 messages of profiles I follow
export const getOtherMessages = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/messages/other');

    dispatch({
      type: GET_OTHER_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// Get the last 25 messages of a specific profile I follow
export const getMessagesFromProfileIFollow = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(
      '/messages/followedProfile?$username'
    );

    dispatch({
      type: GET_MESSAGES_FOLLOWED_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};
