import { useRouter } from "next/router";
import { useCategoryContext } from "../../../../hooks/useCategoryContext";
import { useProductContext } from "../../../../hooks/useProductContext";

export const useGetActiveProducts = () => {
  const getProducts = (allProducts, categories, path) => {
    console.log(categories);
    console.log(allProducts);

    console.log("get");
    const activeCategory = getActiveCategory(path, categories);

    //validating path
    if (!activeCategory) {
      router.push("/404");
    }

    const activeProducts = getActiveProducts(activeCategory.path, allProducts);
    return activeProducts;
  };

  function getActiveCategory(path, categories) {
    const pathString = path.join(",");
    let activeCategory = null;
    categories.forEach((category) => {
      if (category.path == pathString) {
        activeCategory = category;
      }
    });
    return activeCategory;
  }

  function getActiveProducts(pathString, allProducts) {
    const activeProducts = allProducts.filter((p) => {
      const regex = new RegExp(`${pathString}.*`, "g");
      return p.category.path.match(regex);
    });
    return activeProducts;
  }

  return { getProducts };
};
