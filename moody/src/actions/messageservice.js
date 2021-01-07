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
    var resultSet = sortMessages(res.data);
    dispatch({
      type: GET_MY_MESSAGES,
      payload: resultSet
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// Get the last 100 messages of profiles I follow
export const getOtherMessages = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('/messages/other');
    var resultSet = sortMessages(res.data);
    dispatch({
      type: GET_OTHER_MESSAGES,
      payload: resultSet
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

// Get the last 30 messages of a specific profile I follow
export const getMessagesFromProfileIFollow = (username) => async (dispatch) => {
  try {
    const res = await socialGraphService.get(
      '/messages/followedProfile?$username'
    );
    var resultSet = sortMessages(res.data);
    console.log(resultSet);
    dispatch({
      type: GET_MESSAGES_FOLLOWED_PROFILE,
      payload: resultSet
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};

function sortMessages(messageArray) {
  // copy res.data to resultArray for sorting
  var resultArray = messageArray;
  for (var i = 0; i < messageArray.length; i++) {
    resultArray[i] = messageArray[i];
    resultArray[i].timestamp = new Date(resultArray[i].timestamp);
  }

  // sort results by timestamp in ASC order
  var sortedArray = resultArray.sort(function (a, b) {
    return b.timestamp - a.timestamp;
  });
  console.log(resultArray);
  console.log(sortedArray);
  return sortedArray;
}

// Post new Message
export async function postMessage(msg) {
  try {
    await socialGraphService
      .post('messages', {
        author: msg.author,
        text: msg.text
      })
      .then((res) => {
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
}
