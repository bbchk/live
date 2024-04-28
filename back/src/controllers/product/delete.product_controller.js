import * as productService from "#src/services/product/delete.product_service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.deleteProduct(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(200).json(result.product);
});
