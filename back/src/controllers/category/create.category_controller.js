import * as categoryService from '#src/services/category/create.category_service.js';
import { asyncErrorHandler } from '#src/utils/async_error_handler.js';

export const createCategory = asyncErrorHandler(async (req, res, next) => {
  const createdCategory = await categoryService.createCategory(req.body);
  res.status(200).json(createdCategory);
});
