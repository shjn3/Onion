import {
  GET_LIST_SALE_REQUEST,
  GET_LIST_SALE_SUCCESS,
  GET_LIST_SALE_FAIL,
} from "../constants/actionTypes";

const initial = {
  listSale: [],
  success: false,
  error: false,
};
export default (state = initial, action) => {
  switch (action.type) {
    case GET_LIST_SALE_REQUEST:
      return {
        ...state,
        listSale: [],
        success: false,
        error: false,
      };
    case GET_LIST_SALE_SUCCESS:
      console.log(action);
      return {
        ...state,
        listSale: action.payload,
        success: true,
        error: false,
      };
    case GET_LIST_SALE_FAIL:
      return {
        ...state,
        listSale: [],
        success: false,
        error: false,
      };

    default:
      return state;
  }
};
