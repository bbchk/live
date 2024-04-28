import * as categoryService from "#src/services/category/update.category_service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const updateCategory = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedCategory = await categoryService.updateCategory(id, req.body);

  if (!updatedCategory)
    return next(new _Error(`Category with id ${id} not found.`, 404));

  res.status(200).json(updatedCategory);
});
