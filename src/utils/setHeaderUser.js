import axios from "axios";

export const setHeaderAxios = (info) => {
  axios.defaults.withCredentials = true;
  if (info) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${info}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
