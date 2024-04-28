import * as categoryService from "#src/services/category/get.category_service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const getCategories = asyncErrorHandler(async (req, res, next) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
});

export const getCategoryByPath = asyncErrorHandler(async (req, res, next) => {
  const { path: slugPath } = req.params;

  const category = await categoryService.getCategoryBySlugPath(slugPath);
  res.status(200).json(category);
});

export const getDirectSubcategoriesByPath = asyncErrorHandler(
  async (req, res, next) => {
    const { path: slugPath } = req.params;

    const parentCategory = await categoryService.getCategoryBySlugPath(
      slugPath
    );
    const ONE_LEVEL_NESTED_DEEP = 1;
    const categories = await categoryService.getSubcategories(
      parentCategory,
      ONE_LEVEL_NESTED_DEEP
    );
    res.status(200).json(categories);
  }
);
