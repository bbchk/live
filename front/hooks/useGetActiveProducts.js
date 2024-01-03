export const useGetActiveProducts = () => {
  const getActiveProducts = (allProducts, activeCategory) => {
    const pathString = activeCategory.path;

    const regex = new RegExp(`${pathString}.*`, "g");

    const activeProducts = allProducts.filter((p) => {
      return p.category.path.match(regex);
    });

    return activeProducts;
  };

  return { getActiveProducts };
};
