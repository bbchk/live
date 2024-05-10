import category from '#src/models/category.model.js';

export const updateCategory = async (id, updatedData) => {
  return await category.findByIdAndUpdate(
    id,
    { ...updatedData },
    { new: true },
  );
};
