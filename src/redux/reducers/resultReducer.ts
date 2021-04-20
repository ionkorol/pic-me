import { Reducer } from "redux";
import { UserProp } from "../../utils/interfaces";
import { RESULT_CLEAR, RESULT_SET } from "../actions/types";

const initialState = {
  data: null,
};

const userReducer: Reducer<
  { data: "win" | "loss" | null },
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case RESULT_SET:
      return {
        ...state,
        data: action.payload,
      };

    case RESULT_CLEAR:
      return {
        ...state,
        data: null,
      };

    default:
      return state;
  }
};

export default userReducer;
