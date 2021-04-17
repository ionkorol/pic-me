import { Reducer } from "redux";
import { GAME_SET_CATEGORY } from "../actions/types";

const initialState = {
  currentCategory: null,
};

const userReducer: Reducer<
  { currentCategory: any },
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case GAME_SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
