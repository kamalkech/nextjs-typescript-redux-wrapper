import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPhoto, findPhoto } from "../../redux/actions/photoActions";

import Link from "next/link";
import Layout from "../../components/Layout";

const DetailsPage = (props: any) => {
  return (
    <Layout title="Details | Next.js + TypeScript Example">
      <div className="container fluid mt-4 mb-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-header">Details</div>
              <div className="card-body text-center">
                <h5 className="card-title text-truncate">
                  {props.photo.title}
                </h5>
                <img
                  src={props.photo.thumbnailUrl}
                  className="card-img-top"
                  alt={props.photo.title}
                />
              </div>
              <div className="card-footer text-muted">
                <Link href="/photos">
                  <a>
                    <button className="btn btn-danger">Go to photos</button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPhoto: bindActionCreators(fetchPhoto, dispatch),
    findPhoto: bindActionCreators(findPhoto, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  photo: state.photo.photo,
});

DetailsPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  if (state.photo.photos.length > 0) {
    await props.store.dispatch(findPhoto(props.query.id));
  } else {
    await props.store.dispatch(fetchPhoto(props.query.id));
  }

  return { id: parseInt(props.query.id) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
