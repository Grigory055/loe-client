export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const SET_USER = 'SET_USER';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGOUT = 'LOGOUT'

export default class Actions {
  static setUser(userData: IUser) {
    return { type: 'SET_USER', payload: userData };
  }
}

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (login) => ({
  type: LOGIN_SUCCESS,
  payload: { login },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

