import { Reducer } from "redux";
import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const userReducer: Reducer<
  { loading: boolean; data: any; error: any },
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case CATEGORIES_GET_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
