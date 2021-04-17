import { AppDispatch, RootState } from "../store";
import { GAME_SET_CATEGORY } from "./types";
import firebase from "../../utils/firebase";
import { UserProp } from "../../utils/interfaces";

export const setCategory = (category: string) => (dispatch: AppDispatch) => {
  dispatch({ type: GAME_SET_CATEGORY, payload: category });
};

export const addPoint = (category: string) => async (
  dispatch: AppDispatch,
  getState
) => {
  const user = getState().user.data as UserProp;
  const catRef = firebase
    .firestore()
    .collection("users")
    .doc(user.id)
    .collection("categories")
    .doc(category);
  const catSnap = await catRef.get();
  if (catSnap.exists) {
    catRef.update({
      points: firebase.firestore.FieldValue.increment(1),
    });
  } else {
    catRef.set({
      id: category.toLowerCase(),
      name: category,
      points: 1,
    });
  }
};
