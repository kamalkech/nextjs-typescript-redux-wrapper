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
import wrapper from "../redux/store";

// Bootstrap.
import "bootstrap/dist/css/bootstrap.min.css";

// Tailwind css.
import "../styles.css";

// Component App.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Create Initial Props.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
