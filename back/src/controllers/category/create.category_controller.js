import * as categoryService from "#src/services/category/create.category_service.js";

export const createCategory = async (req, res) => {
  try {
    const createdCategory = await categoryService.createCategory(req.body);
    res.status(200).json(createdCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createCategories = async (req, res) => {
  try {
    const createdCategories = await categoryService.createCategories(req.body);
    res.status(200).json(createdCategories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
