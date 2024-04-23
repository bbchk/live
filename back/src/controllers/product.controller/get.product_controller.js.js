import * as productService from "#src/services/product.service/get.product_service.js";

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(200).json(result.product);
};

export const getProductsByIds = async (req, res) => {
  const productIds = req.body;
  const result = await productService.getProductsByIds(productIds);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(200).json(result.products);
};

export const getProducts = async (req, res) => {
  const result = await productService.getProducts();

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(200).json(result.products);
};
