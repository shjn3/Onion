import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/actionTypes";

const initialState = {
  authLoading: true,
  isAuth: false,
  username: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, authLoading: true, isAuth: false, username: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authLoading: false,
        isAuth: true,
        username: action.payload.username,
      };
    case LOGIN_FAIL:
      return { ...state, authLoading: false, isAuth: false, username: null };
    case LOGOUT_REQUEST:
      return { ...state, authLoading: true };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authLoading: false,
        isAuth: false,
        username: null,
      };
    case LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
};
