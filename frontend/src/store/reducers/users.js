import {
  LOG_OUT,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  POST_USER_FAILURE,
  POST_USER_REQUEST,
  POST_USER_SUCCESS
} from "../actions/UsersActions";

const initialState = {
  loading: false,
  onlineUsers: [],
  newUser:{},
  messages: [],
  loginUser:{},
  status: null
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_REQUEST:
      return {...state, loading: true};
    case POST_USER_SUCCESS:
      return {...state, loading: false, newUser: action.value};
    case POST_USER_FAILURE:
      return {...state, loading: false, status: action.error};
    case LOGIN_USER_REQUEST:
      return {...state, loading: true};
    case LOGIN_USER_SUCCESS:
      return {...state, loginUser: action.value, loading: false};
    case LOGIN_USER_FAILURE:
      return {...state, status: action.error, loading: false};
    case LOG_OUT:
      return {...initialState};
    case 'ACTIVE_USERS':
      return {...state, onlineUsers: action.value, messages: action.messagesList};
    case 'REMOVE_USER':
      return {...state, onlineUsers: state.onlineUsers.filter(u => u.user._id !== action.value)};
    case 'RECEIVE_MESSAGE':
      return {...state, messages:[action.value, ...state.messages]};
    case 'DELETE_MESSAGE':
      return {...state, messages:state.messages.filter(m => m._id !== action.id)};
    case 'SECRET_MESSAGE':
      return {...state, messages:[action.value, ...state.messages]};
    default:
      return state;
  }
};