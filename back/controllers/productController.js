import Product from "../models/product.js";
import category from "../models/category.js";
import mongoose from "mongoose";
import { unslugify } from "@bbuukk/slugtrans/slugify";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";

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

//? this is unefficient approach
export const getProductsByIds = async (req, res) => {
  const productIds = req.body;

  try {
    const products = await Product.find({
      _id: { $in: productIds },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .populate("category")
    .exec();

  res.status(200).json(products);
};

export const getProductsByCategoryPath = async (req, res) => {
  let { categoryPath, pageId } = req.params;

  const PRODUCTS_ON_PAGE = 50;

  const categoryPathOriginal = untransliterate(unslugify(categoryPath));

  const activeCategory = await category.findOne({
    path: new RegExp(`^${categoryPathOriginal.toLowerCase()}$`, "i"),
  });

  if (activeCategory == null) {
    return res
      .status(404)
      .json({ message: "Category with this path is not found" });
  }

  const categories = await category
    .find({
      path: new RegExp(categoryPathOriginal, "i"),
    })
    .select("name order path imagePath")
    .exec();

  const activeCategoryIds = categories.map((category) => category._id);

  let query = Product.find({
    category: { $in: activeCategoryIds },
  })
    .select("name price images") // specify the fields you need
    .sort({ createdAt: -1 })
    .populate("category");

  if (pageId != 0) {
    query = query.skip(PRODUCTS_ON_PAGE * (pageId - 1)).limit(PRODUCTS_ON_PAGE);
  }

  const products = await query.exec();

  const activeCategoryLevel = activeCategory.path.split(",").length;

  res.status(200).json({
    category: activeCategory,
    subcategories: categories.filter(
      (c) =>
        // all subcategories except activeCategory
        c["name"] !== activeCategory["name"] &&
        //only one level deeper subcategories
        c.path.split(",").length == activeCategoryLevel + 1
    ),
    products,
  });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id).populate("category").exec();

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(200).json(result.product);
};

export const createProduct = async (req, res) => {
  const {
    brand,
    name,
    category,
    characteristics,
    price,
    left,
    starRating,
    description,
    imageUrl,
    // code,
    // barcode,
  } = req.body;

  try {
    const product = await Product.create({
      brand,
      name,
      category,
      price,
      left,
      characteristics,
      starRating,
      description,
      imageUrl,
      //? todo
      // code,
      // barcode,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createProducts = async (req, res) => {
  const products = req.body;

  try {
    const createdProducts = await Product.insertMany(products);
    res.status(200).json(createdProducts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  res.status(200).json(updatedProduct);
};

export const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting products" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  await Product.deleteOne({ _id: id });

  res.status(200).json(result.product);
};
