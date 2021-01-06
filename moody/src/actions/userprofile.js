<<<<<<< HEAD
/* import socialGraphService from '..utils/socialGraphService';
=======
import socialGraphService from '..utils/socialGraphService';
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745
import { setAller } from './alert';

import {
  GET_PROFILEOFINTEREST,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR
} from './types';

//Get profile of interest
export const getProfileOfInterest = () => async (dispatch) => {
  try {
    const res = await socialGraphService.get('profile/username');

    dispatch({
      type: GET_PROFILEOFINTEREST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.status }
    });
  }
};
<<<<<<< HEAD
 */
=======
>>>>>>> cae8b56ddf46ebf2037e82f0b347f3c7b7154745
