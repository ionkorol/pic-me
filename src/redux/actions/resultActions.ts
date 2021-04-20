import { AppDispatch } from "../store";
import { RESULT_SET, RESULT_CLEAR } from "./types";

export const set = (result: "win" | "loss") => (dispatch: AppDispatch) => {
  dispatch({ type: RESULT_SET, payload: result });
};

export const clear = () => (dispatch: AppDispatch) => {
  dispatch({ type: RESULT_CLEAR, payload: null });
};
