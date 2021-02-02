import {
  GET_MY_MESSAGES,
  GET_OTHER_MESSAGES,
  MESSAGE_ERROR,
  POST_MESSAGE
} from '../actions/types';

const initialState = {
  // loading flag - data is fetched or not
  loading: true,
  messages: [],
  error: {}
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: payload,
        error: {}
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        messages: []
      };
    case GET_OTHER_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: payload,
        error: {}
      };
    case POST_MESSAGE:
      return {
        ...state,
        error: {}
      };
    default:
      return state;
  }
};

export default posts;
