import { createContext, useReducer, useEffect } from "react";

export const ProductContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      const allProducts =
        action.payload?.allProducts || state.products?.allProducts;
      const currentProducts =
        action.payload?.currentProducts || state.products?.currentProducts;
      return {
        products: { allProducts, currentProducts },
      };
    // //todo products state has diffrent structure now
    // case "CREATE_PRODUCT":
    //   return {
    //     products: [action.payload, ...state.product],
    //   };
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

      const products = { allProducts: json };

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
