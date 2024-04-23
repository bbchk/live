import category from "#src/models/category.model.js";

export const createCategory = async (categoryData) => {
  return await category.create(categoryData);
};

export const createCategories = async (categories) => {
  return await category.insertMany(categories);
};
