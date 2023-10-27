import { createContext, useReducer } from "react";

export const ProductContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        product: [action.payload, ...state.product],
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: null,
  });

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
