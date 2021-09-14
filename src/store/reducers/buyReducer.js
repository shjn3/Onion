import {
  GET_LIST_BUY_FAIL,
  GET_LIST_BUY_REQUEST,
  GET_LIST_BUY_SUCCESS,
  GET_LIST_CUSTOMER_FAIL,
  GET_LIST_CUSTOMER_REQUEST,
  GET_LIST_CUSTOMER_SUCCESS,
  GET_LIST_BUY_DETAIL_REQUEST,
  GET_LIST_BUY_DETAIL_SUCCESS,
  GET_LIST_BUY_DETAIL_FAIL,
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

const initial = {
  listBuy: [],
  listCustomer: [],
  listDetail: [],
  successBuyDetail: false,
  successCustomer: false,
  successBuy: false,
  errorBuyDetail: false,
  errorCustomer: false,
  errorBuy: false,
};
export default (state = initial, action) => {
  switch (action.type) {
    //GET BUY
    case GET_LIST_BUY_REQUEST:
      return { ...state, listBuy: [], successBuy: false, errorBuy: false };
    case GET_LIST_BUY_SUCCESS:
      return {
        ...state,
        listBuy: action.payload,
        successBuy: true,
        errorBuy: false,
      };
    case GET_LIST_BUY_FAIL:
      return { ...state, listBuy: [], successBuy: false, errorBuy: true };
    //GET BUY CUSTOMER
    case GET_LIST_CUSTOMER_REQUEST:
      return {
        ...state,
        listCustomer: [],
        successCustomer: false,
        errorCustomer: false,
      };
    case GET_LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        listCustomer: action.payload.detail,
        successCustomer: true,
        errorCustomer: false,
      };
    case GET_LIST_CUSTOMER_FAIL:
      return {
        ...state,
        listCustomer: [],
        successCustomer: false,
        errorCustomer: true,
      };
    //GET BUY DETAIL
    case GET_LIST_BUY_DETAIL_REQUEST:
      return {
        ...state,
        listDetail: [],
        successBuyDetail: false,
        errorBuyDetail: false,
      };
    case GET_LIST_BUY_DETAIL_SUCCESS:
      return {
        ...state,
        listDetail: action.payload.detail,
        successBuyDetail: true,
        errorBuyDetail: false,
      };
    case GET_LIST_BUY_DETAIL_FAIL:
      return {
        ...state,
        listDetail: [],
        successBuyDetail: false,
        errorBuyDetail: true,
      };
    //OPTION
    //OPTION BUY
    case OPTION_BUY_REQUEST:
      return { ...state, successBuy: false, errorBuy: false };
    case OPTION_BUY_SUCCESS:
      return { ...state, successBuy: true, errorBuy: false };
    case OPTION_BUY_FAIL:
      return { ...state, successBuy: false, errorBuy: true };
    //OPTION BUY CUSTOMER
    case OPTION_BUY_CUSTOMER_REQUEST:
      return { ...state, successCustomer: false, errorCustomer: false };
    case OPTION_BUY_CUSTOMER_SUCCESS:
      return { ...state, successCustomer: true, errorCustomer: false };
    case OPTION_BUY_CUSTOMER_FAIL:
      return { ...state, successCustomer: false, errorCustomer: false };
    //OPTION BUY DETAIL
    case OPTION_BUY_DETAIL_REQUEST:
      return { ...state, successBuyDetail: false, errorBuyDetail: false };
    case OPTION_BUY_DETAIL_SUCCESS:
      return { ...state, successBuyDetail: true, errorBuyDetail: false };
    case OPTION_BUY_DETAIL_FAIL:
      return { ...state, successBuyDetail: false, errorBuyDetail: true };
    default:
      return state;
  }
};
