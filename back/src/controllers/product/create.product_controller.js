import * as productService from "#src/services/product/create.product_service.js";
import { asyncErrorHandler } from "#src/utils/async_error_handler.js";

export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  res.status(200).json(product);
});

export const createProducts = asyncErrorHandler(async (req, res, next) => {
  try {
    const createdProducts = await productService.createProducts(req.body);
    res.status(200).json(createdProducts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
