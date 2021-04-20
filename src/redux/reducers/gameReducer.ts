import { Reducer } from "redux";
import {
  GAME_SET_CATEGORY,
  GAME_CLEAR_CATEGORY,
  GAME_REWARD_POINT_REQUEST,
  GAME_REWARD_POINT_SUCCESS,
  GAME_REWARD_POINT_FAILURE,
} from "../actions/types";

const initialState = {
  category: null,
  rewardPointLoading: false,
  rewardPointError: null,
};

const userReducer: Reducer<
  {
    category: string | null;
    rewardPointLoading: boolean;
    rewardPointError: string | null;
  },
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case GAME_SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case GAME_CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
      };

    case GAME_REWARD_POINT_REQUEST:
      return {
        ...state,
        rewardPointLoading: true,
        rewardPointError: null,
      };

    case GAME_REWARD_POINT_SUCCESS:
      return {
        ...state,
        rewardPointLoading: false,
        rewardPointError: null,
      };

    case GAME_REWARD_POINT_FAILURE:
      return {
        ...state,
        rewardPointLoading: false,
        rewardPointError: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
