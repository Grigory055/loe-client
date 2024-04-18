import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_USER } from '../actions/authActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.login,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
