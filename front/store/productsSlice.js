import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsInfo = createAsyncThunk(
  "products/fetchFromDB",
  async () => {
    //todo change to then and catch chain instead of try catch block
    try {
      const res = await axios.get(`/products/`);

      let lastActiveProduct = null;
      if (typeof window !== "undefined") {
        lastActiveProduct = JSON.parse(localStorage.getItem("activeProduct"));
      } else {
        console.log("lastActiveProdcuts are not get");
      }

      return { products: res.data, lastActiveProduct: lastActiveProduct };
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    lastActiveProduct: null,
    products: null,
    status: "idle",
    error: null,
  },
  reducers: {
    set: (state, action) => {
      state.products = action.payload;
    },
    setActiveProduct: (state, action) => {
      state.lastActiveProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.lastActiveProduct = action.payload.lastActiveProduct;
      })
      .addCase(getProductsInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set, setActiveProduct } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
