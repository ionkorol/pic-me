import { Reducer } from "redux";
import {
  PICTURE_SET,
  PICTURE_CLEAR,
  PICTURE_GET_LABELS_REQUEST,
  PICTURE_GET_LABELS_SUCCESS,
  PICTURE_GET_LABELS_FAILURE,
  PICTURE_CLEAR_LABELS,
} from "../actions/types";

const initialState = {
  image: null,
  labelsLoading: false,
  labelsData: null,
  labelsError: null,
};

const pictureReducer: Reducer<
  {
    image: string | null;
    labelsLoading: boolean;
    labelsData: string[] | null;
    labelsError: string | null;
  },
  { type: string; payload: any }
> = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case PICTURE_SET:
      return {
        ...state,
        image: action.payload,
      };

    case PICTURE_CLEAR:
      return {
        ...state,
        image: null,
      };

    case PICTURE_GET_LABELS_REQUEST:
      return {
        ...state,
        labelsLoading: true,
        labelsData: null,
        labelsError: null,
      };

    case PICTURE_GET_LABELS_SUCCESS:
      return {
        ...state,
        labelsLoading: false,
        labelsData: action.payload,
      };

    case PICTURE_GET_LABELS_FAILURE:
      return {
        ...state,
        labelsLoading: false,
        labelsData: null,
        labelsError: action.payload,
      };

    case PICTURE_CLEAR_LABELS:
      return {
        ...state,
        labelsData: null,
      };

    default:
      return state;
  }
};

export default pictureReducer;
