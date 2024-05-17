import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './slices/search.slice'
import { categoriesReducer } from './slices/categories.slice'
import { filtersReducer } from './slices/filters.slice'
import { userReducer } from './slices/user.slice'
import { modalsReducer } from './slices/global_comps/global_comps.slice'
import { wishListReducer } from './slices/wish_list.slice'
import { cartReducer } from './slices/cart.slice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    modals: modalsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    user: userReducer,
    cart: cartReducer,
    wishList: wishListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
