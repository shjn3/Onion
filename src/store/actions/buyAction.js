import {
  GET_LIST_BUY_FAIL,
  GET_LIST_BUY_REQUEST,
  GET_LIST_BUY_SUCCESS,
  GET_LIST_BUY_DETAIL_FAIL,
  GET_LIST_BUY_DETAIL_SUCCESS,
  GET_LIST_BUY_DETAIL_REQUEST,
  GET_LIST_CUSTOMER_FAIL,
  GET_LIST_CUSTOMER_SUCCESS,
  GET_LIST_CUSTOMER_REQUEST,
  OPTION_BUY_FAIL,
  OPTION_BUY_REQUEST,
  OPTION_BUY_SUCCESS,
  OPTION_BUY_DETAIL_FAIL,
  OPTION_BUY_DETAIL_REQUEST,
  OPTION_BUY_DETAIL_SUCCESS,
  OPTION_BUY_CUSTOMER_FAIL,
  OPTION_BUY_CUSTOMER_REQUEST,
  OPTION_BUY_CUSTOMER_SUCCESS,
} from "../constants/actionTypes";
import * as api from "../../api/index.js";
import { showNotification } from "../../functions/helper.js";

//BUY action
//get list BUY

export const getListBuy = () => async (dispatch) => {

  dispatch({ type: GET_LIST_BUY_REQUEST });
  await api
    .listBuy()
    .then((response) => {
      const { success, detail } = response.data;
      if (success) {
        dispatch({ type: GET_LIST_BUY_SUCCESS, payload: detail });
      }
    })
    .catch((error) => {
      if (error.response.status === 403) {
        dispatch({ type: "REFRESH_TOKEN" });
      } else {
        dispatch({ type: GET_LIST_BUY_FAIL });
        showNotification({ type: "error", message: "Error", title: "Error" });
      }
    });
};
//create a BUY
export const createBuy = (item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_REQUEST });
    const { data } = await api.createBuy(item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_SUCCESS, payload: detail });
      dispatch(getListBuy());
      showNotification({
        type: "success",
        message: "Tạo thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
//update a BUY
export const editBuy = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_REQUEST });
    const { data } = await api.editBuy(id, item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_SUCCESS, payload: detail });
      dispatch(getListBuy());
      showNotification({
        type: "success",
        message: "Cập nhật thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
//delete a BUY
export const deleteBuy = (id) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_REQUEST });
    const { data } = await api.deleteBuy(id);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_SUCCESS, payload: detail });
      dispatch(getListBuy());
      showNotification({
        type: "success",
        message: "Xoá thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};

//buy customer action
//get list customer
export const getListCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_CUSTOMER_REQUEST });
    const { data } = await api.listCustomer();
    const { success, detail } = data;
    if (success) {
      dispatch({
        type: GET_LIST_CUSTOMER_SUCCESS,
        payload: { detail, owner: id },
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: GET_LIST_CUSTOMER_FAIL });
      showNotification({ type: "error", message: "Error", title: "Error" });
    }
  }
};
//create a buy Customer
export const createCustomer = (item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_CUSTOMER_REQUEST });
    const { data } = await api.createCustomer(item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_CUSTOMER_SUCCESS, payload: detail });
      dispatch(getListCustomer());
      showNotification({
        type: "success",
        message: "Tạo thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_CUSTOMER_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
//update a BUY Customer
export const editCustomer = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_CUSTOMER_REQUEST });
    const { data } = await api.editCustomer(id, item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_CUSTOMER_SUCCESS, payload: detail });
      dispatch(getListCustomer());
      showNotification({
        type: "success",
        message: "Cập nhật thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_CUSTOMER_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
//delete a buy CUstomer
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_CUSTOMER_REQUEST });
    const { data } = await api.deleteCustomer(id);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_CUSTOMER_SUCCESS, payload: detail });
      dispatch(getListCustomer());
      showNotification({
        type: "success",
        message: "Xoá thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_CUSTOMER_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
//buy DETAIL action
//Get list buy DETAIL
export const getListBuyDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_BUY_DETAIL_REQUEST });
    const { data } = await api.listBuyDetail(id);
    const { success, detail } = data;
    if (success) {
      dispatch({
        type: GET_LIST_BUY_DETAIL_SUCCESS,
        payload: { detail, customer: id },
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: GET_LIST_BUY_DETAIL_FAIL });
      showNotification({ type: "error", message: "Error", title: "Error" });
    }
  }
};
//create a buy DETAIL
export const createBuyDetail = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_DETAIL_REQUEST });
    const { data } = await api.createBuyDetail(item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_DETAIL_SUCCESS, payload: detail });
      dispatch(getListBuyDetail(id));
      showNotification({
        type: "success",
        message: "Tạo thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_DETAIL_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
// update a buy DETAIL
export const editBuyDetail = (idGet, id, item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_DETAIL_REQUEST });
    const { data } = await api.editBuyDetail(id, item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_DETAIL_SUCCESS, payload: detail });
      dispatch(getListBuyDetail(idGet));
      showNotification({
        type: "success",
        message: "Cập nhật thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_DETAIL_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};

//delete a buy DETAIL
export const deleteBuyDetail = (idGet, id) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_BUY_DETAIL_REQUEST });
    const { data } = await api.deleteBuyDetail(id);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_BUY_DETAIL_SUCCESS, payload: detail });
      dispatch(getListBuyDetail(idGet));
      showNotification({
        type: "success",
        message: "Xoá thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      dispatch({ type: "REFRESH_TOKEN" });
    } else {
      dispatch({ type: OPTION_BUY_DETAIL_FAIL });
      showNotification({
        type: "error",
        message: error.message,
        title: "Error",
      });
    }
  }
};
