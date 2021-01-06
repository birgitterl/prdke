<<<<<<< HEAD
/* import { GET_PROFILEOFINTEREST, PROFILE_ERROR } from '../actions/types';
=======
import { GET_PROFILEOFINTEREST, PROFILE_ERROR } from '../actions/types';
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745

const initialState = {
  profile: null,
  loading: true,
  error: {}
};

const profileOfInterest = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILEOFINTEREST:
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
    default:
      return state;
  }
};

export default profileOfInterest;
<<<<<<< HEAD
 */
=======
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745
