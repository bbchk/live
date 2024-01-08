import category from "../models/category.js";

export const getCategories = async (req, res) => {
  const categories = await category.find({}).sort({ createdAt: -1 });

  res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
  const { name, path, image, order } = req.body;

  try {
    const createdCategory = await category.create({ name, path, image, order });
    res.status(200).json(createdCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createCategories = async (req, res) => {
  const categories = req.body;

  try {
    const createdCategories = await category.insertMany(categories);
    res.status(200).json(createdCategories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
