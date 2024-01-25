export const useGetActiveProducts = () => {
  const getActiveProducts = (allProducts, activeCategory) => {
    const pathString = activeCategory.path;
    // console.log(pathString);

    // const activeProducts = allProducts.map((p) => {
    //   const activeCategory = p.category.find((cat) =>
    //     cat.path.includes(pathString)
    //   );
    //   if (activeCategory) {
    //     return { ...p, activeCategory };
    //   }
    //   // return p;
    // });

    const activeProducts = allProducts.filter((p) => {
      const activeCategory = p.category.find(
        (cat) => cat.path.includes(pathString)
        // (cat) => cat.path === "Для Собак"
      );
      if (activeCategory) {
        // p.activeCategory = activeCategory;
        return p;
      }
    });

    // console.log(activeProducts);

    return activeProducts;
  };

  return { getActiveProducts };
};
