export const useGetActiveCategory = () => {
  function getActiveCategory(allCategories, path) {
    let activeCategory = null;

    console.log(path);
    const pathString = path.split("-").join(",");
    allCategories.forEach((category) => {
      if (category.path == pathString) {
        activeCategory = category;
      }
    });
    return activeCategory;
  }

  return { getActiveCategory };
};
