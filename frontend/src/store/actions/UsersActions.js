import axiosUrl from "../../axiosUrl";
import {NotificationManager} from "react-notifications";

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export const postUserRequest = () => ({type:POST_USER_REQUEST});
export const postUserSuccess = value => ({type:POST_USER_SUCCESS, value});
export const postUserFailure = error => ({type:POST_USER_FAILURE, error});

export const loginUserRequest = () => ({type:LOGIN_USER_REQUEST});
export const loginUserSuccess = value => ({type:LOGIN_USER_SUCCESS, value});
export const loginUserFailure = error => ({type:LOGIN_USER_FAILURE, error});

export const postUser = (path, data) => {
  return async dispatch => {
    try {
      dispatch(postUserRequest());
      const response = await axiosUrl.post(path, data);
      dispatch(postUserSuccess(response.data));
      NotificationManager.success('Success')
    } catch (error) {
      if (error.response && error.response.data){
        dispatch(postUserFailure(error.response.data));
        NotificationManager.error(error.response.data);
      } else {
        dispatch(postUserFailure({global:'No internet connection'}));
        NotificationManager.error('No internet connection');
      }
    }
  };
};

export const loginUser = (path, data) => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      const response = await axiosUrl.post(path, data);
      dispatch(loginUserSuccess(response.data));
      NotificationManager.success('Success')
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(loginUserFailure(error.response.data));
        NotificationManager.error(error.response.data.error)
      } else {
        dispatch(loginUserFailure({global:'No internet'}));
      }
    }
  };
};

export const logOut = (id) => {
  return async (dispatch) => {
    try {
      await axiosUrl.delete('/users/session/' + id);
      dispatch({type: LOG_OUT});
    } catch (e) {
      NotificationManager.error(e.message);
    }
  };
};


export const facebookLogin = data => {
  return async dispatch => {
    try {
      const response = await axiosUrl.post('/users/facebookLogin', data);
      dispatch(loginUserSuccess(response.data));
      NotificationManager.success('Success');
    } catch (e) {
      dispatch(loginUserFailure(e));
      NotificationManager.error(e?.message);
    }
  };
};