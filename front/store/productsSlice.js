import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsFromDB = createAsyncThunk(
  "products/fetchFromDB",
  async () => {
    //todo change to then and catch chain instead of try catch block
    try {
      const res = await axios.get(`/products/`);
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { products: null, status: "idle", error: null },
  reducers: {
    set: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFromDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsFromDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsFromDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
