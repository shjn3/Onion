import { combineReducers } from "redux";

import posts from "./posts";
import buy from "./buyReducer";
import sale from "./saleReducer";
import auth from "./authReducer";

export const reducers = combineReducers({ posts, buy, sale, auth });
