import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

const initialState: {
  loading: boolean;
  labels: string[] | null;
  error: SerializedError | null;
} = {
  loading: false,
  labels: null,
  error: null,
};

export const getLabels = createAsyncThunk("lables/get", async (image: string) => {
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
  return data;
});

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLabels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLabels.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.labels = payload;
    });
    builder.addCase(getLabels.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default labelsSlice.reducer;
