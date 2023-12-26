import { SET_PRODUCTS } from "root/actions/setProduct";

const productReducer = (state = { products: null }, action) => {
  if (action.type === SET_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }

  return state;
};

export default productReducer;
