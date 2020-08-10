import { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovies } from "../../redux/actions/movieActions";

import Layout from "../../components/Layout";

import { Button, Card, Container, Row, Col } from "react-bootstrap";

const IndexPage = (props: any) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Container fluid="md" className="mt-2 mb-4">
        <Row>
          <Col className="text-center">
            <h1>List movies</h1>
          </Col>
        </Row>
      </Container>
      <Container fluid="md">
        <Row>
          {props.movies &&
            props.movies.map((m: any, idx: number) => (
              <Col key={idx} xs={3} md={3} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w300/${m.poster_path}`}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="text-truncate">
                      {m.original_title}
                    </Card.Title>
                    <Link href="/movies/[id]" as={`/movies/${m.id}`}>
                      <a>
                        <Button variant="dark">Details</Button>
                      </a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
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
