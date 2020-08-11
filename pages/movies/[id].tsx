import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovie, findMovie } from "../../redux/actions/movieActions";

import Link from "next/link";
import Layout from "../../components/Layout";

import { Button, Card, Container, Row, Col } from "react-bootstrap";

const DetailsPage = (props: any) => {
  return (
    <Layout title="Details | Next.js + TypeScript Example">
      <div className="container fluid mt-4 mb-4">
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header">Details</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5 className="card-title text-truncate">
                      {props.movie.original_title}
                    </h5>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`}
                      className="card-img-top"
                      alt={props.movie.original_title}
                    />
                  </div>
                  <div className="col-md-9 mt-4">
                    <p>{props.movie.overview}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted">
                <Link href="/movies">
                  <a>
                    <button className="btn btn-danger">Go to movies</button>
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
    fetchMovie: bindActionCreators(fetchMovie, dispatch),
    findMovie: bindActionCreators(findMovie, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  movie: state.movie.movie,
});

DetailsPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  if (state.movie.movies.length > 0) {
    await props.store.dispatch(findMovie(props.query.id));
  } else {
    await props.store.dispatch(fetchMovie(props.query.id));
  }

  return { id: parseInt(props.query.id) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
