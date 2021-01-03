// User timeline: Fetch my messages

import socialGraphService from '../utils/socialGraphService';

import { GET_MY_MESSAGES, GET_OTHER_MESSAGES, MESSAGE_ERROR, POST_MESSAGE } from './types';

// Get the users current messages
export const getMyMessages = () => async(dispatch) => {
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
export const getOtherMessages = () => async(dispatch) => {
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

// Post new Message
export async function postMessage(msg) {
    try {
        const res = await socialGraphService.post('messages', {
                author: msg.author,
                text: msg.text
            })
            .then(res => {
                console.log(res);
            });
    } catch (err) {
        console.log(err);
    }
};