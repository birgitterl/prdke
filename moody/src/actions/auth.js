import authService from '../utils/authService';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

// Load User
// --> DONE
export const loadUser = () => async (dispatch) => {
  try {
    const res = await authService.get('/auth');
    delete res.data['status'];

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data;
    dispatch({
      type: AUTH_ERROR,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Register User
// --> DONE
export const register = (formData) => async (dispatch) => {
  try {
    const res = await authService.post('/users', formData);
    delete res.data['status'];
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Registration successful', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;

    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    } else {
      dispatch(setAlert(error.msg, 'danger'));
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Login User
// --> DONE
export const login = (username, password) => async (dispatch) => {
  const body = { username, password };

  try {
    const res = await authService.post('/auth', body);
    delete res.data['status'];

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Login successful', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;

    if (error.status === 500 || error.status === 503) {
      dispatch(
        setAlert(
          'Ups... Something went wrong. Please try again later',
          'danger'
        )
      );
    } else {
      dispatch(setAlert(error.msg, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: { status: error.status, msg: error.msg }
    });
  }
};

// Logout
// --> DONE
export const logout = () => async (dispatch) => {
  await dispatch({
    type: LOGOUT
  });
  dispatch(setAlert('Successfully logged out', 'success'));
};
