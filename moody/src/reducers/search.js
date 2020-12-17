import {
  SEARCH_PROFILES,
  GET_PROFILES,
  GET_PROFILEOFINTEREST,
  CLEAR_PROFILEOFINTEREST,
  CLEAR_PROFILES,
  CLEAR_SEARCH
} from '../actions/types';

const initialState = {
  text: '',
  profilesLoading: true,
  profileOfInterestLoading: true,
  error: {},
  profiles: [],
  profileOfInterest: null
};

const search = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_PROFILES:
      return {
        ...state,
        text: payload,
        profilesLoading: true,
        profileOfInterestLoading: true,
        profiles: [],
        profileOfInterest: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profilesLoading: false,
        profiles: payload,
        text: ''
      };
    case GET_PROFILEOFINTEREST:
      return {
        ...state,
        profileOfInterest: payload,
        profileOfInterestLoading: false
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profilesLoading: true,
        profiles: []
      };
    case CLEAR_PROFILEOFINTEREST:
      return {
        ...state,
        profileOfInterestLoading: true,
        profileOfInterest: null
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        text: ''
      };
    default:
      return state;
  }
};

export default search;
