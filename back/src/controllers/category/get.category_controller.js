import * as categoryService from "#src/services/category/get.category_service.js";

export const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
};

export const getCategoryByPath = async (req, res) => {
  const { path: slugPath } = req.params;

  const category = await categoryService.getCategoryBySlugPath(slugPath);
  res.status(200).json(category);
};

export const getDirectSubcategoriesByPath = async (req, res) => {
  const { path: slugPath } = req.params;

  const parentCategory = await categoryService.getCategoryBySlugPath(slugPath);
  const ONE_LEVEL_NESTED_DEEP = 1;
  const categories = await categoryService.getSubcategories(
    parentCategory,
    ONE_LEVEL_NESTED_DEEP
  );
  res.status(200).json(categories);
};
