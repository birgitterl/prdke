/* import socialGraphService from '..utils/socialGraphService';
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
 */
