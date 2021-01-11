import {
  SEARCH_PROFILES,
  SEARCH_MESSAGES,
  GET_PROFILEOFINTEREST,
  CLEAR_PROFILEOFINTEREST,
  CLEAR_SEARCH,
  SET_SEARCH_TEXT,
  SEARCH_ERROR
} from '../actions/types';

const initialState = {
  text: '',
  profilesLoading: true,
  messagesLoading: true,
  profileOfInterestLoading: true,
  error: {},
  profiles: [],
  messages: [],
  profileOfInterest: null
};

const search = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_TEXT:
      return {
        ...state,
        text: payload,
        profilesLoading: true,
        messagesLoading: true,
        profileOfInterestLoading: true,
        profiles: [],
        messages: []
      };
    case SEARCH_PROFILES:
      return {
        ...state,
        profilesLoading: false,
        profiles: payload,
        text: ''
      };
    case SEARCH_MESSAGES:
      return {
        ...state,
        messagesLoading: false,
        messages: payload,
        text: ''
      };
    case GET_PROFILEOFINTEREST:
      return {
        ...state,
        profileOfInterest: payload,
        profileOfInterestLoading: false
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
        text: '',
        profilesLoading: true,
        profiles: [],
        messages: []
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default search;
