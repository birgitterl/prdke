// User timeline = Fetch my messages, Home timeline = Fetch messages of a profile I follow
import socialGraphService from '../utils/socialGraphService';
import { setAlert } from './alert';

import {
  GET_MY_MESSAGES,
  GET_OTHER_MESSAGES,
  MESSAGE_ERROR,
  POST_MESSAGE
} from './types';

// Get the users current messages
//--> DONE
export const getMyMessages = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/messages/my');
    delete res.data['status'];
    var resultSet = sortMessages(res.data.message);
    dispatch({
      type: GET_MY_MESSAGES,
      payload: resultSet
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
      type: MESSAGE_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Get a specific users current messages
//--> DONE
export const getUsersMessages = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(`/messages/${username}`);
    delete res.data['status'];
    var resultSet = sortMessages(res.data.message);
    dispatch({
      type: GET_OTHER_MESSAGES,
      payload: resultSet
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
      type: MESSAGE_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Get the last 100 messages of profiles I follow
// --> DONE
export const getOtherMessages = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/messages/iFollow');
    delete res.data['status'];
    var resultSet = sortMessages(res.data.message);
    dispatch({
      type: GET_OTHER_MESSAGES,
      payload: resultSet
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
      type: MESSAGE_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

const sortMessages = (messageArray) => {
  // copy res.data to resultArray for sorting
  var resultArray = messageArray;
  for (var i = 0; i < messageArray.length; i++) {
    resultArray[i] = messageArray[i];
    resultArray[i].timestamp = new Date(resultArray[i].timestamp);
  }

  // sort results by timestamp in ASC order
  var sortedArray = resultArray.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });
  return sortedArray;
};

// Post new Message
// --> DONE
export const postMessage = (msg) => async (dispatch) => {
  if (msg.emoji === null) {
    dispatch(setAlert('You need to select an Emoji first', 'danger'));
  } else if (msg.text === null) {
    dispatch(setAlert('Please enter a text message first', 'danger'));
  } else {
    try {
      console.log(msg);
      const res = await socialGraphService.post('/messages', {
        text: msg.text,
        emoji: msg.emoji
      });
      dispatch({
        type: POST_MESSAGE,
        payload: res.data.profile
      });
      dispatch(setAlert('Message successfully posted', 'success'));
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
        type: MESSAGE_ERROR,
        payload: { status: error.status, msg: error.msg }
      });
    }
    dispatch(getMyMessages());
  }
};
