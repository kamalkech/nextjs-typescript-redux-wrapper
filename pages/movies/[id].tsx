import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovie, findMovie } from "../../redux/actions/movieActions";

import Link from "next/link";
import Layout from "../../components/Layout";

import { Button, Card, Container, Row, Col } from "react-bootstrap";

const DetailsPage = (props: any) => {
  return (
    <Layout title="Details | Next.js + TypeScript Example">
      <Container fluid="md" className="mt-4 mb-4">
        <Row>
          <Col xs={12} md={12} className="mb-4">
            <Card>
              <Card.Header>Details</Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={3} md={3}>
                    <Card.Title>{props.movie.original_title}</Card.Title>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`}
                    />
                  </Col>
                  <Col xs={6} md={6} className="mt-4">
                    <p>{props.movie.overview}</p>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Link href="/movies">
                  <a>
                    <Button variant="danger">Go to movies</Button>
                  </a>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
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
