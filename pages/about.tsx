import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  decrementCounter,
  incrementCounter,
} from "../redux/actions/counterActions";

import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = (props: any) => {
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <div>
        <h1>About page</h1>
        <h2>{props.counter}</h2>
      </div>
      <hr />
      {props.photos.length > 0 ? JSON.stringify(props.photos) : <></>}
      <hr />
      <Link href="/">
        <a>Go home</a>
      </Link>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    incrementCounter: bindActionCreators(incrementCounter, dispatch),
    decrementCounter: bindActionCreators(decrementCounter, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  counter: state.counter.value,
  photos: state.photo.photos,
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
