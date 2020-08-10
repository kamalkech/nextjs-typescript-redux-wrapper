import {
  FETCH_MOVIES,
  FETCH_MOVIE,
  FIND_MOVIE,
  SET_LOADING,
  LOGS_ERROR,
} from "../actions/movieActions";

const initialState = {
  movies: [],
  movie: null,
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case FIND_MOVIE:
      const movies = state.movies;
      const movie = movies.filter((p: any) => p.id == action.payload);
      return {
        ...state,
        movie: movie[0],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default movieReducer;
