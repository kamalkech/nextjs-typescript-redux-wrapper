import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  decrementCounter,
  incrementCounter,
} from "../redux/actions/counterActions";
import { fetchPhotos } from "../redux/actions/photoActions";

import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = (props: any) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div>
        <h1>Index page</h1>
        <button onClick={props.incrementCounter}>Increment</button>
        <button onClick={props.decrementCounter}>Decrement</button>
        <h1>{props.counter}</h1>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            props.fetchPhotos();
          }}
        >
          Decrement
        </button>
        {props.photos.length > 0 ? JSON.stringify(props.photos) : <></>}
      </div>
      <hr />
      <Link href="/about">
        <a>About</a>
      </Link>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    incrementCounter: bindActionCreators(incrementCounter, dispatch),
    decrementCounter: bindActionCreators(decrementCounter, dispatch),
    fetchPhotos: bindActionCreators(fetchPhotos, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  counter: state.counter.value,
  photos: state.photo.photos,
});

IndexPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  console.log("state.photo.photos", state.photo.photos);
  if (state.photo.photos.length > 0) {
    // props.store.dispatch({
    //   type: "GET_PHOTO",
    //   payload: props.query.id,
    // });
  } else {
    await props.store.dispatch(fetchPhotos());
  }

  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
