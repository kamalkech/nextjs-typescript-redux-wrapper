import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import combinedReducer from "../redux/reducers/rootReducer";

// Middleware.
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    // Create loggerMiddleware.
    const loggerMiddleware = createLogger();
    return composeWithDevTools(
      applyMiddleware(...middleware, loggerMiddleware)
    );
  }
  return applyMiddleware(...middleware);
};

// Reducer.
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

// Init store.
const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

// Create a wrapper.
const wrapper = createWrapper(initStore);

export default wrapper;
