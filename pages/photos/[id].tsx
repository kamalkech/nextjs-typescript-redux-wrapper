import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPhoto, findPhoto } from "../../redux/actions/photoActions";

import Link from "next/link";
import Layout from "../../components/Layout";

import { Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";

const DetailsPage = (props: any) => {
  return (
    <Layout title="Details | Next.js + TypeScript Example">
      <Container fluid="md" className="mt-4 mb-4">
        <Row>
          <Col xs={3} md={3} className="mb-4">
            <Card>
              <Card.Header>Details</Card.Header>
              <Card.Body>
                <Card.Title>{props.photo.title}</Card.Title>
                <Card.Img variant="top" src={props.photo.thumbnailUrl} />
              </Card.Body>
              <Card.Footer className="text-muted">
                <Link href="/photos">
                  <a>
                    <Button variant="danger">Go to photos</Button>
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
