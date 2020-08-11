import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovies } from "../../redux/actions/movieActions";

import Layout from "../../components/Layout";

const IndexPage = (props: any) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="container fluid mt-2 mb-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>List movies</h1>
          </div>
        </div>
      </div>
      <div className="container fluid">
        <div className="row">
          {props.movies &&
            props.movies.map((m: any, idx: number) => (
              <div key={idx} className="col-md-3 mb-4">
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${m.poster_path}`}
                    className="card-img-top"
                    alt={m.original_title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-truncate">
                      {m.original_title}
                    </h5>
                    <Link href="/movies/[id]" as={`/movies/${m.id}`}>
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
    fetchMovies: bindActionCreators(fetchMovies, dispatch),
  };
};

const mapStateToProps = (state: any) => ({
  movies: state.movie.movies,
  loading: state.movie.loading,
});

IndexPage.getInitialProps = async (props: any) => {
  const state = props.store.getState();
  if (state.movie.movies.length === 0) {
    await props.store.dispatch(fetchMovies());
  }
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
