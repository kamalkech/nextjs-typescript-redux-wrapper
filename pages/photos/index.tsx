import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  decrementCounter,
  incrementCounter,
} from "../../redux/actions/counterActions";
import { fetchPhotos } from "../../redux/actions/photoActions";

import Link from "next/link";
import Layout from "../../components/Layout";

const IndexPage = (props: any) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div>
        <h1>Photos page</h1>
        <button onClick={props.incrementCounter}>Increment</button>
        <button onClick={props.decrementCounter}>Decrement</button>
        <h1>{props.counter}</h1>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            props.fetchPhotos(10);
          }}
        >
          Fetch photos
        </button>
        <ul>
          {props.photos &&
            props.photos.map((p: any, idx: number) => (
              <li key={idx}>
                <Link href="/photos/[id]" as={`/photos/${p.id}`}>
                  <a>
                    -{p.id} {p.title} <br />
                    <img src={p.thumbnailUrl} alt="" />
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        {props.photos.length > 0 ? JSON.stringify(props.photos) : <></>}
      </div>
      <hr />
      <Link href="/photos/[id]" as={`/photos/1`}>
        <a>/photos/1</a>
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
  if (state.photo.photos.length === 0) {
    await props.store.dispatch(fetchPhotos());
  }

  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
