import * as productService from "#src/services/product/update.product_service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.updateProduct(id, req.body);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(200).json(result.product);
});
