import counterReducer from "./counterReducer";
import photoReducer from "./photoReducer";
import movieReducer from "./movieReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter: counterReducer,
  photo: photoReducer,
  movie: movieReducer,
});

export default rootReducer;
