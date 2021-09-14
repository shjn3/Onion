import {
  GET_LIST_SALE_FAIL,
  GET_LIST_SALE_REQUEST,
  GET_LIST_SALE_SUCCESS,
  OPTION_FAIL,
  OPTION_REQUEST,
  OPTION_SUCCESS,
} from "../constants/actionTypes";
import * as api from "../../api/index.js";
import { showNotification } from "../../functions/helper.js";

export const getListSale = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_SALE_REQUEST });
    const { data } = await api.listSale();
    const { success, detail } = data;
    if (success) {
      dispatch({ type: GET_LIST_SALE_SUCCESS, payload: detail });
    }
  } catch (error) {
    dispatch({ type: GET_LIST_SALE_FAIL });
    showNotification({ type: "error", message: "Error", title: "Error" });
  }
};

export const createSale = (item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_REQUEST });
    const { data } = await api.createSale(item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_SUCCESS, payload: detail });
      showNotification({
        type: "success",
        message: "Tạo thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    dispatch({ type: OPTION_FAIL });
    showNotification({ type: "error", message: error.message, title: "Error" });
  }
};

export const editSale = (id, item) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_REQUEST });
    const { data } = await api.editSale(id, item);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_SUCCESS, payload: detail });
      dispatch(getListSale());
      showNotification({
        type: "success",
        message: "Cập nhật thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    dispatch({ type: OPTION_FAIL });
    showNotification({ type: "error", message: error.message, title: "Error" });
  }
};

export const deleteSale = (id) => async (dispatch) => {
  try {
    dispatch({ type: OPTION_REQUEST });
    const { data } = await api.deleteSale(id);
    const { success, detail } = data;
    if (success) {
      dispatch({ type: OPTION_SUCCESS, payload: detail });
      dispatch(getListSale());
      showNotification({
        type: "success",
        message: "Xoá thành công!",
        title: "Success",
      });
    }
  } catch (error) {
    dispatch({ type: OPTION_FAIL });
    showNotification({ type: "error", message: error.message, title: "Error" });
  }
};
