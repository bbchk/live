import * as categoryService from "#src/services/category/get.category_service.js";

export const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
};
