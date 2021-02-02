import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_FOLLOWS,
  FOLLOWS_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
  follows: false
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {}
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {}
      };
    case GET_FOLLOWS:
      return {
        ...state,
        follows: payload,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case FOLLOWS_ERROR:
      return {
        ...state,
        error: payload,
        follows: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        error: {}
      };
    default:
      return state;
  }
};

export default profile;
