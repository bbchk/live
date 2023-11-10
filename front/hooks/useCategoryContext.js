import { CategoryContext } from "../context/categoryContext";
import { useContext } from "react";

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw Error("context used outside of context provider");
  }

  return context;
};
