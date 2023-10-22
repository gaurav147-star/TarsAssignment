import axios from "axios";

import {
  PHOTOS_REQUEST,
  PHOTOS_SUCCESS,
  PHOTOS_FAILS,
} from "../constants/photoConstant";

// Thunk action creator for searching photos
export const searchPhotos = (query) => async (dispatch) => {
  // Define your API access key and URL
  const accessKey = "axA0A4Ea8IHgBl5qiTb9pAZvjgfG1lYPMKwUJmOPvs8";
  // const accessKey = "2lB-CpHDjqyB78Gpwdxt0hArp7SZJt4TJQSCqwUjRIE";
  const url = "https://api.unsplash.com";

  if (!accessKey || !url) {
    console.error("Unsplash API access key or URL not defined!");
    return;
  }

  try {
    // Make a GET request to the Unsplash API
    dispatch({ type: PHOTOS_REQUEST });
    const { data } = await axios.get(
      `${url}/search/photos?query=${query}&client_id=${accessKey}`
    );

    dispatch({
      type: PHOTOS_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: PHOTOS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export default searchPhotos;
