import * as productService from "#src/services/product.service/update.product_service.js";

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productService.updateProduct(id, req.body);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(200).json(result.product);
};
