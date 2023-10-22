import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants/profileConstant";
import axios from "axios";

export const dataProfile = (username) => async (dispatch) => {
  const accesskey = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!accesskey) {
    // Handle the case where the API access key is not defined.
    // You can either provide a default key or display an error message.
    console.error("Unsplash API access key not defined!");
    return;
  }
  try {
    dispatch({ type: PROFILE_REQUEST });
    const { data } = await axios.get(
      `${url}/users/${username}?client_id=${accesskey}`
    );
    // if (condition) {

    // }
    dispatch({
      type: PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
