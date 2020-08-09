//Action Types
export const FETCH_PHOTOS = "FETCH_PHOTOS";
export const FETCH_PHOTO = "FETCH_PHOTO";
export const FIND_PHOTO = "FIND_PHOTO";

//Action Creator
// export const fetchPhotos = () => ({
//   type: FETCH_PHOTOS,
// });
export const fetchPhotos = (limit = 6) => async (dispatch: any) => {
  console.log("fetchPhotos running");
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=" + limit
  );
  const data = await res.json();

  dispatch({
    type: FETCH_PHOTOS,
    payload: data,
  });
};

export const fetchPhoto = (id: any) => async (dispatch: any) => {
  console.log("fetchPhoto running");
  const res = await fetch("https://jsonplaceholder.typicode.com/photos/" + id);
  const data = await res.json();
  dispatch({
    type: FETCH_PHOTO,
    payload: data,
  });
};

export const findPhoto = (id: any) => ({
  type: FIND_PHOTO,
  payload: id,
});
