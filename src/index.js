import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./store/reducers";
import App from "./components/layout/App.js";
import "./styles/index.css";
// const store = createStore(reducers, compose(applyMiddleware(thunk)));
import { composeWithDevTools } from "redux-devtools-extension";
import { getAccessToken } from "./store/actions/account";
let buffer = [];
const middleWareLogging = (store) => (next) => (action) => {
  buffer.push(action);
  //const auth = store.getState().auth.isAuth;
  if (action.type === "REFRESH_TOKEN") {
    store.dispatch(getAccessToken()).then(() => {
      store.dispatch({ type: "TOKEN_REFRESHED" });
    });

    let pos = buffer.map((e) => e.type).indexOf("REFRESH_TOKEN") - 1;

    for (let i = pos; i > -1; i = i - 1) {
      if (typeof buffer[i] === "function") {
        store.dispatch({
          type: "RESEND",
          action: buffer[i](store.dispatch),
        });
        break;
      }
    }
  } else if (buffer.length > 20) {
    buffer.splice(0, buffer.length - 20);
  }
  return next(action);
};
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(middleWareLogging, thunk)
    // other store enhancers if any
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
