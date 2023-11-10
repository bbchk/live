import { createContext, useReducer, useEffect } from "react";

export const CategoryContext = createContext();

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        categories: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        categories: [action.payload, ...state.product],
      };
    default:
      return state;
  }
};

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, {
    categories: null,
  });

  //todo move context state initialization to app.tsx
  useEffect(() => {
    //todo try/catch
    const fetchCategories = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/categories/`
      );
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_CATEGORIES", payload: json });
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
