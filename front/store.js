import { productsReducer } from "root/reducers/productsReducer";
import { categoriesReducer } from "root/reducers/categoriesReducer";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { fetchProducts } from "root/actions/productsActions";
import { fetchCategories } from "root/actions/categoriesActions";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.dispatch(fetchProducts());
store.dispatch(fetchCategories());

export default store;
