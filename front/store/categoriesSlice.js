import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoriesInfo = createAsyncThunk(
  "categories/fetchFromDB",
  async () => {
    try {
      const res = await axios.get(`/categories/`);

      let lastActiveCategory = null;
      if (typeof window !== "undefined") {
        lastActiveCategory = JSON.parse(localStorage.getItem("activeCategory"));
      } else {
        console.log("lastActiveProdcuts are not get");
      }

      return { categories: res.data, lastActiveCategory: lastActiveCategory };
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    lastActiveCategory: null,
    categories: null,
    status: "idle",
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.categories = action.payload;
    },
    create: (state, action) => {
      state.categories = [...state.categories, action.payload];
    },
    setActiveCategory: (state, action) => {
      state.lastActiveCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoriesInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
        state.lastActiveCategory = action.payload.lastActiveCategory;
      })
      .addCase(getCategoriesInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set, create, setActiveCategory } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
