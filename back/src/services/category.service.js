import category from "#src/models/category.js";

export const getCategories = async () => {
  return await category.find({}).sort({ createdAt: -1 });
};

export const createCategory = async (categoryData) => {
  return await category.create(categoryData);
};

export const createCategories = async (categories) => {
  return await category.insertMany(categories);
};

export const updateCategory = async (id, updatedData) => {
  return await category.findByIdAndUpdate(
    id,
    { ...updatedData },
    { new: true }
  );
};
