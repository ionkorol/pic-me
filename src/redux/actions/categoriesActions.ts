import { Dispatch } from "redux";
import {
  CATEGORIES_GET_REQUEST,
  CATEGORIES_GET_SUCCESS,
  CATEGORIES_GET_FAILURE,
} from "../actions/types";

import firebase from "../../utils/firebase";
import { AppDispatch } from "../store";

export const categoriesGet = () => async (dispatch: AppDispatch) => {
  dispatch({ type: CATEGORIES_GET_REQUEST, payload: null });
  try {
    const categoriesQuery = await firebase
      .firestore()
      .collection("categories")
      .get();
    const data = categoriesQuery.docs.map((doc) => doc.data());
    dispatch({ type: CATEGORIES_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORIES_GET_FAILURE, payload: error });
  }
};
