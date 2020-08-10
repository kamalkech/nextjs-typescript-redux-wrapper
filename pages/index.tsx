import Link from "next/link";
import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Container fluid="md" className="mt-2 mb-4">
        <Row>
          <Col className="text-center">
            <h1>MAROC DEVELOP 👋</h1>
            <img src="/images/nextjs-redux.png" />
            <hr />
            <Link href="/movies">
              <a>Go to List Movies</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default IndexPage;
