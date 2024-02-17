export const useFindCategoryByPath = () => {
  const findCategoryByPath = (path, allCategories) => {
    const category = allCategories.find((c) => {
      return c.path == path;
    });
    return category;
  };

  return { findCategoryByPath };
};
