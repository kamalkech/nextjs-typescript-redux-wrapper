import { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPhotos } from "../../redux/actions/photoActions";

import Layout from "../../components/Layout";

import { Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";

const IndexPage = (props: any) => {
  const [fetch, setFetch] = useState(false);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Container fluid="md" className="mt-2 mb-4">
        <Row>
          <Col className="text-center">
            <h1>List Photos</h1>
            <hr />
            <Button
              variant="dark"
              onClick={async (e) => {
                e.stopPropagation();
                const limit = fetch || props.photos.length > 4 ? 4 : 12;
                await props.fetchPhotos(limit);
                setFetch(!fetch);
              }}
            >
              {props.loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-1"
                />
              ) : props.photos.length > 4 ? (
                `Reset`
              ) : (
                `Fetch 12 items`
              )}
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid="md">
        <Row>
          {props.photos &&
            props.photos.map((p: any, idx: number) => (
              <Col key={idx} xs={3} md={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={p.thumbnailUrl} />
                  <Card.Body className="text-center">
                    <Card.Title className="text-truncate">{p.title}</Card.Title>
                    <Link href="/photos/[id]" as={`/photos/${p.id}`}>
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
