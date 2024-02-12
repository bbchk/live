import { makeSlug } from "root/utils/slugify";

export const useFindCategoryByPath = () => {
  const findCategoryByPath = (path, allCategories) => {
    const category = allCategories.find((c) => {
      return c.path == path;
    });
    return category;
  };

  return { findCategoryByPath };
};

export const useFindCategoryBySlugPath = () => {
  const findCategoryBySlugPath = (slugPath, allCategories) => {
    const category = allCategories.find((c) => {
      return makeSlug(c.path) == slugPath;
    });
    return category;
  };

  return { findCategoryBySlugPath };
};
