import { createContext, useReducer } from "react";

export const CategoryContext = createContext();

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        products: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        product: [action.payload, ...state.product],
      };
    default:
      return state;
  }
};

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, {
    products: null,
  });

  return (
    <CategoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
