import { SET_PRODUCTS } from "root/actions/productsActions";

export const productsReducer = (state = { products: null }, action) => {
  if (action.type === SET_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }

  return state;
};
