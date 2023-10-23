const Product = require("../models/product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(200).json(result.product);
};

const createProduct = async (req, res) => {
  const {
    brand,
    name,
    category,
    size,
    weight,
    color,
    price,
    isAvailable,
    starRating,
    packing,
    description,
    imageUrl,
  } = req.body;

  try {
    const product = await Product.create({
      brand,
      name,
      category,
      size,
      weight,
      color,
      price,
      isAvailable,
      starRating,
      packing,
      description,
      imageUrl,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createProducts = async (req, res) => {
  const products = req.body;

  try {
    const createdProducts = await Product.insertMany(products);
    res.status(200).json(createdProducts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  await Product.updateOne({ _id: id }, { ...req.body });
  res.status(200).json(result.product);
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting products" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  await Product.deleteOne({ _id: id });

  res.status(200).json(result.product);
};

const getProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { status: 404, error: "No such product" };
  }

  const product = await Product.findById(id);

  if (!product) {
    return { status: 400, error: "No such product" };
  }

  return { status: 200, product };
};

module.exports = {
  createProduct,
  createProducts,
  getProduct,
  getProducts,
  deleteProduct,
  deleteAllProducts,
  updateProduct,
};
