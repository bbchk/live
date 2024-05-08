import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/products.slice";
import { categoriesReducer } from "./slices/categories.slice";
import { filtersReducer } from "./slices/filters.slice";
import { userReducer } from "./slices/user.slice";
import { modalsReducer } from "./slices/global_comps/global_comps.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    modals: modalsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
