import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productsReducer } from "./productsSlice";
import { categoriesReducer } from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
