import { ProductContext } from "../context/productContext";
import { useContext } from "react";

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw Error("context used outside of context provider");
  }

  return context;
};
