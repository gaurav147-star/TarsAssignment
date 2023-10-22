import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants/profileConstant";

export const profileReducer = (state = { profile: [] }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { loading: true, ...state };
    case PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
