import * as categoryService from "#src/services/category/create.category_service.js";
import _Error from "#src/utils/error.js";

const asyncErrorHandler = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch((err) => next(err));
  };
};

export const createCategory = asyncErrorHandler(async (req, res) => {
  const createdCategory = await categoryService.createCategory(req.body);
  res.status(200).json(createdCategory);
});

export const createCategories = asyncErrorHandler(async (req, res) => {
  const createdCategories = await categoryService.createCategories(req.body);
  res.status(200).json(createdCategories);
});
