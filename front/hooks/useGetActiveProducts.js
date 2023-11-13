export const useGetActiveProducts = () => {
  const getProducts = (allProducts, activeCategory) => {
    const pathString = activeCategory.path;
    const activeProducts = allProducts.filter((p) => {
      const regex = new RegExp(`${pathString}.*`, "g");
      return p.category.path.match(regex);
    });

    return activeProducts;
  };

  return { getProducts };
};
