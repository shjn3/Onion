import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/actionTypes";
import * as api from "../../api/index.js";
import { showNotification } from "../../functions/helper.js";
import { setHeaderAxios } from "../../utils/setHeaderUser";

export const loginAccount = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.login(user);
    const { success, message, detail } = data;
    const { username, token } = detail;
    if (success) {
      setHeaderAxios(token);
      dispatch({ type: LOGIN_SUCCESS, payload: username });
      showNotification({ type: "success", message: message, title: "Login" });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    setHeaderAxios(null);
    showNotification({
      type: "error",

      message: "Login Failed",
      title: "Error",
    });
  }
};
//register account
export const registerAccount = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST, message: "REQUEST REGISTER" });

    const { data } = await api.register(user);
    const { success, message, detail } = data;
    const { username, token } = detail;
    if (success) {
      setHeaderAxios(token);
      dispatch({
        type: LOGIN_SUCCESS,
        message: "SUCCESS REGISTER",
        payload: username,
      });
      showNotification({
        type: "success",
        message: message,
        title: "Register successfully!!",
      });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, message: "FAIL REGISTER" });
    setHeaderAxios(null);
    showNotification({
      type: "error",

      message: "Register Failed",
      title: "Error",
    });
  }
};
//logout account
export const logoutAccount = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const { data } = await api.logout();
    const { success } = data;
    if (success) {
      setHeaderAxios(null);
      dispatch({ type: LOGOUT_SUCCESS });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: LOGOUT_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
//refresh access Token
export const getAccessToken = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.refreshToken();
    const { success, detail } = data;
    const { token } = detail;

    if (success) {
      setHeaderAxios(token);
      dispatch({ type: LOGIN_SUCCESS, payload: detail });
    }
  } catch (error) {
    setHeaderAxios(null);
    dispatch({ type: LOGIN_FAIL });
  }
};
