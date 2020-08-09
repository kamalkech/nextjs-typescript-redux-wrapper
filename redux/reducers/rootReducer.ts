import counterReducer from "./counterReducer";
import photoReducer from "./photoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter: counterReducer,
  photo: photoReducer,
});

export default rootReducer;
