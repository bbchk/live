import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategoriesFromDB = createAsyncThunk(
  "categories/fetchFromDB",
  async () => {
    try {
      const res = await axios.get(`/categories/`);
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: null, status: "idle", error: null },
  reducers: {
    set: (state, action) => {
      state.categories = action.payload;
    },
    create: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set, create } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
