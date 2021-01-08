import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_FOLLOWERS_OF_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {}
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case GET_FOLLOWERS_OF_PROFILE:
      return {
        ...state,
        followingProfiles: payload,
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};

export default profile;
