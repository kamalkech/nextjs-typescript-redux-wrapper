//Action Types
export const FETCH_PHOTOS = "FETCH_PHOTOS";
export const FETCH_PHOTO = "FETCH_PHOTO";
export const FIND_PHOTO = "FIND_PHOTO";
export const SET_LOADING = "SET_LOADING";
export const LOGS_ERROR = "LOGS_ERROR";

export const fetchPhotos = (limit = 4) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=" + limit
    );
    const data = await res.json();

    dispatch({
      type: FETCH_PHOTOS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const fetchPhoto = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos/" + id
    );

    const data = await res.json();

    dispatch({
      type: FETCH_PHOTO,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const findPhoto = (id: any) => ({
  type: FIND_PHOTO,
  payload: id,
});
