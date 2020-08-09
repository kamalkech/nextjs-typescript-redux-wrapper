import { FETCH_PHOTOS, FETCH_PHOTO, FIND_PHOTO } from "../actions/photoActions";

const photoReducer = (state = { photos: [], photo: null }, action: any) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return { ...state, photos: action.payload };
    case FETCH_PHOTO:
      return { ...state, photo: action.payload };
    case FIND_PHOTO:
      const photos = state.photos;
      const photo = photos.filter((p: any) => p.id == action.payload);
      return { ...state, photo: photo[0] };
    default:
      return { ...state };
  }
};

export default photoReducer;
