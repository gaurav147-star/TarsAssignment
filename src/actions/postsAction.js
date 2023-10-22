import {
  POSTS_FAILS,
  POSTS_REQUEST,
  POSTS_SUCCESS,
} from "../constants/postsConstant";
import axios from "axios";

export const listPosts =
  (page = 1) =>
  async (dispatch) => {
    // const accesskey = "SvK6Qgpk1CyLTyL5jvx9zlPQ7mffLIlDqIsguzLyxTs";
    const accesskey = "axA0A4Ea8IHgBl5qiTb9pAZvjgfG1lYPMKwUJmOPvs8";
    // const accesskey = "2lB-CpHDjqyB78Gpwdxt0hArp7SZJt4TJQSCqwUjRIE";
    const url = "https://api.unsplash.com";

    if (!accesskey) {
      console.error("Unsplash API access key not defined!");
      return;
    }

    try {
      dispatch({ type: POSTS_REQUEST });
      const { data } = await axios.get(
        `${url}/photos/random?count=10&client_id=${accesskey}&page=${page}`
      );

      dispatch({
        type: POSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POSTS_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
