import {
  PICTURE_SET,
  PICTURE_CLEAR,
  PICTURE_GET_LABELS_REQUEST,
  PICTURE_GET_LABELS_SUCCESS,
  PICTURE_GET_LABELS_FAILURE,
  PICTURE_CLEAR_LABELS,
} from "./types";

import * as FileSystem from "expo-file-system";
import firebase from "../../utils/firebase";
import { AppDispatch, RootState } from "../store";

export const getLabels = (image: string) => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  dispatch({ type: PICTURE_GET_LABELS_REQUEST, payload: null });
  try {
    // const imagePathArray = image.split("/");
    // const imageName = imagePathArray[imagePathArray.length - 1];
    // const imageRef = firebase.storage().ref(`images/test.jpg`);
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // const x = imageRef.putString(image, "data_url");
    // console.log((await x).state);
    const res = await fetch(
      "https://us-central1-picpic-310022.cloudfunctions.net/GetLabels",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: base64,
        }),
      }
    );
    const data = await res.json();
    dispatch({ type: PICTURE_GET_LABELS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PICTURE_GET_LABELS_FAILURE, payload: error });
  }
};

export const clearLabels = () => (dispatch: AppDispatch) => {
  dispatch({ type: PICTURE_CLEAR_LABELS, payload: null });
};

export const set = (image: string) => (dispatch: AppDispatch) => {
  dispatch({ type: PICTURE_SET, payload: image });
};

export const clear = () => (dispatch: AppDispatch) => {
  dispatch({ type: PICTURE_CLEAR, payload: null });
};
