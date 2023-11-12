import { createContext, useReducer, useEffect } from "react";

export const ProductContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    //todo products state has diffrent structure now
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.product],
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: null,
  });

  useEffect(() => {
    //todo try/catch
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/`);
      const json = await res.json();

      const products = { allProducts: json, currentProducts: null };
      console.log(products);

      if (res.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: products });
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
