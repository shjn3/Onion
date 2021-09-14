import axios from "axios";
const api = {
  local: "http://localhost:5000",
  heroku: "https://backendonion.herokuapp.com",
};
const url = api.heroku;

//ACCOUNT
export const login = (user) => axios.post(url + "/users/login", user);
export const register = (user) => axios.post(url + "/users/register", user);
export const logout = () => axios.get(url + "/users/logout");
//refreshTOken
export const refreshToken = () =>
  axios.post(url + "/users/token", {}, { withCredentials: true });

//Buy
export const listBuy = () => axios.get(url + "/buy");
export const createBuy = (item) => axios.post(url + "/buy", item);
export const editBuy = (id, item) => axios.patch(url + "/buy/" + id, item);
export const deleteBuy = (id) => axios.delete(url + "/buy/" + id);

//sale
export const listSale = () => axios.get(url + "/sale");
export const createSale = (item) => axios.post(url + "/sale/create", item);
export const editSale = (id, item) =>
  axios.patch(url + "/sale/edit/" + id, item);
export const deleteSale = (id) => axios.delete(url + "/sale/delete/" + id);

//Customer
export const listCustomer = () => axios.get(url + "/customer/1");
export const createCustomer = (item) =>
  axios.post(url + "/customer/create", item);
export const editCustomer = (id, item) =>
  axios.patch(url + "/customer/" + id, item);
export const deleteCustomer = (id) => axios.delete(url + "/customer/" + id);

//Buy detail
export const listBuyDetail = (id) => axios.get(url + "/buydetail/" + id);
export const createBuyDetail = (item) => axios.post(url + "/buydetail", item);
export const editBuyDetail = (id, item) =>
  axios.patch(url + "/buydetail/" + id, item);
export const deleteBuyDetail = (id) => axios.delete(url + "/buydetail/" + id);
