import App, { AppProps, AppContext } from "next/app";

// Progress.
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// Redux.
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
// Store.
import combinedReducer from "../redux/reducers/rootReducer";

// Component App.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

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

// Create Initial Props.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
