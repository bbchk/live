export const useFindCategoryByPath = () => {
  const findCategoryByPath = (path, allCategories) => {
    const category = allCategories.find((c) => {
      return c.path.toLowerCase() == path.toLowerCase();
    });

    return category;
  };

  return { findCategoryByPath };
};
