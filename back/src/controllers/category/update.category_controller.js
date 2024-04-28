import * as categoryService from "#src/services/category/update.category_service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const updateCategory = asyncErrorHandler(async (req, res, next) => {
  const updatedCategory = await categoryService.updateCategory(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedCategory);
});
