import * as productService from '#src/services/product/create.product_service.js';
import { asyncErrorHandler } from '#src/utils/async_error_handler.js';

export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  res.status(200).json(product);
});
