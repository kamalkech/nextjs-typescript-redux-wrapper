import {
  FETCH_PHOTOS,
  FETCH_PHOTO,
  FIND_PHOTO,
  SET_LOADING,
  LOGS_ERROR,
} from "../actions/photoActions";

const initialState = {
  photos: [],
  photo: null,
  loading: false,
  error: null,
};

const photoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };
    case FETCH_PHOTO:
      return {
        ...state,
        photo: action.payload,
        loading: false,
      };
    case FIND_PHOTO:
      const photos = state.photos;
      const photo = photos.filter((p: any) => p.id == action.payload);
      return {
        ...state,
        photo: photo[0],
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

export default photoReducer;
