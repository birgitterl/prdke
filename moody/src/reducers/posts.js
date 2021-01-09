import {
  GET_MY_MESSAGES,
  GET_OTHER_MESSAGES,
  MESSAGE_ERROR
} from '../actions/types';

const initialState = {
  //property = props
  // loading flag - data is fetched or not
  loading: true,
  // data: array
  messages: [],
  // error:''
  error: {}
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_MESSAGES:
      return {
        // copy of the state object
        ...state,
        loading: false,
        messages: payload
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        messages: null
      };
    case GET_OTHER_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: payload
      };
    default:
      return state;
  }
};

export default posts;
