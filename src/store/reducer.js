import { combineReducers } from "redux";
import { stateReducer } from "./state";

const reducers = combineReducers({
  state: stateReducer,
});

export default reducers;
