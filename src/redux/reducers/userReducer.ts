import { Reducer } from "redux";
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_CLEAR,
} from "../actions/types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const userReducer: Reducer<
  { loading: boolean ; data: any; error: any },
  { type: string; payload: any }
> = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case USER_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case USER_GET_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    case USER_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
