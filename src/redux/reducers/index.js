import { combineReducers } from "redux";
import loadReducer from "./loadReducer";
import projectReducer from "./projectReducer";

import todoReducer from "./todoReducer";

const store = {
  projects: projectReducer,
  todos: todoReducer,
  loadState: loadReducer,
};

export default combineReducers(store);
