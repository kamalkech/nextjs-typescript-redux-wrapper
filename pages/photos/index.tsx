import { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPhotos } from "../../redux/actions/photoActions";

import Layout from "../../components/Layout";

const IndexPage = (props: any) => {
  const [fetch, setFetch] = useState(false);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="container fluid mt-2 mb-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>List Photos</h1>
            <hr />
            <button
              className="btn btn-dark"
              onClick={async (e) => {
                e.stopPropagation();
                const limit = fetch || props.photos.length > 4 ? 4 : 12;
                await props.fetchPhotos(limit);
                setFetch(!fetch);
              }}
            >
              {props.loading ? (
                <div className="spinner-border mr-1" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : props.photos.length > 4 ? (
                `Reset`
              ) : (
                `Fetch 12 items`
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="container fluid">
        <div className="row">
          {props.photos &&
            props.photos.map((p: any, idx: number) => (
              <div key={idx} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src={p.thumbnailUrl}
                    className="card-img-top"
                    alt={p.title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-truncate">{p.title}</h5>
                    <Link href="/photos/[id]" as={`/photos/${p.id}`}>
                      <a>
                        <button className="btn btn-dark">Details</button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPhotos: bindActionCreators(fetchPhotos, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  photos: state.photo.photos,
  loading: state.photo.loading,
});

IndexPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  if (state.photo.photos.length === 0) {
    await props.store.dispatch(fetchPhotos());
  }
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
