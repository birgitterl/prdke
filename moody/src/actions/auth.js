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
export const loadUser = () => async (dispatch) => {
  try {
    const res = await authService.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await authService.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Registration successful', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (username, password) => async (dispatch) => {
  const body = { username, password };

  try {
    const res = await authService.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Login successful', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  await dispatch({
    type: LOGOUT
  });
  dispatch(setAlert('Successfully logged out', 'success'));
};
