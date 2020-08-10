//Action Types
export const FETCH_MOVIES = "FETCH_MOVIES";
export const FETCH_MOVIE = "FETCH_MOVIE";
export const FIND_MOVIE = "FIND_MOVIE";
export const SET_LOADING = "SET_LOADING";
export const LOGS_ERROR = "LOGS_ERROR";

export const fetchMovies = (limit = 4) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0ec9536e25cd559706e938b1636935ae"
    );
    const data = await res.json();

    dispatch({
      type: FETCH_MOVIES,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const fetchMovie = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=0ec9536e25cd559706e938b1636935ae"
    );

    const data = await res.json();

    dispatch({
      type: FETCH_MOVIE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const findMovie = (id: any) => ({
  type: FIND_MOVIE,
  payload: id,
});
