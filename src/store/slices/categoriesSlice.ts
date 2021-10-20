import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import firebase from "firebase";
import { CategoryProp } from "utils/interfaces";

const initialState: {
  loading: boolean;
  categories: CategoryProp[];
  category: string | null;
  error: SerializedError | null;
} = {
  loading: false,
  categories: [],
  category: null,
  error: null,
};

export const getCategories = createAsyncThunk("categories/get", async () => {
  const categoriesQuery = await firebase
    .firestore()
    .collection("categories")
    .get();
  const data = categoriesQuery.docs.map((doc) => doc.data());
  return data as CategoryProp[];
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, { payload }: PayloadAction<string>) => {
      state.category = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default categoriesSlice.reducer;
export const { setCategory } = categoriesSlice.actions;
