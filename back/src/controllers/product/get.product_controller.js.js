import * as productService from "#src/services/product/get.product_service.js";
import * as categoryAndFiltersProductService from "#src/services/product/get_by_category&filters.product_service/get_by_category&filters.product_service.js";

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

export const getProductsByCategoryAndFilters = async (req, res) => {
  let { slugCategoryPath, filtersStr } = req.params;

  try {
    //todo slugCategoryPath, filtersStr validation
    //todo add page filter to filtersStr if it is not present
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  try {
    const result =
      await categoryAndFiltersProductService.getProductsByCategoryAndFilters(
        slugCategoryPath,
        filtersStr
      );

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
