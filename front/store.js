import productReducer from "root/reducers/productReducer";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { fetchProducts } from "root/actions/setProduct";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.dispatch(fetchProducts());

export default store;
