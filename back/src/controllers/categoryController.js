import * as categoryService from "#src/services/category.service.js";

export const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
};

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

export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
