import * as productService from "#src/services/product/get_by_category&filters.product_service/get_by_category&filters.product_service.js";

export const getProductsByCategoryAndFilters = async (req, res) => {
  let { slugCategoryPath, filtersStr } = req.params;

  try {
    //todo slugCategoryPath, filtersStr validation
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  try {
    const result = await productService.getProductsByCategoryAndFilters(
      slugCategoryPath,
      filtersStr
    );

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
