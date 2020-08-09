import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPhoto, findPhoto } from "../../redux/actions/photoActions";

import Link from "next/link";
import Layout from "../../components/Layout";

const DetailsPage = (props: any) => {
  return (
    <Layout title="Details | Next.js + TypeScript Example">
      <h1>Details page</h1>
      <hr />
      {JSON.stringify(props.photos)}
      <hr />
      {props.photo ? JSON.stringify(props.photo) : <></>}

      {props.photo ? (
        <ul>
          <li>{props.photo.id}</li>
          <li>{props.photo.title}</li>
          <li>
            <img src={props.photo.thumbnailUrl} alt="" />
          </li>
        </ul>
      ) : (
        <></>
      )}

      <hr />
      <Link href="/photos">
        <a>Go to photos</a>
      </Link>
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
  photos: state.photo.photos,
  photo: state.photo.photo,
});

// export const getStaticProps: GetStaticProps = async ({
//   params,
//   store,
// }: any) => {
//   try {
//     const id = params?.id;
//     store.dispatch(fetchPhoto(id));
//     // By returning { props: item }, the StaticPropsDetail component
//     // will receive `item` as a prop at build time
//     return {};
//   } catch (err) {
//     return { props: { errors: err.message } };
//   }
// };

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
