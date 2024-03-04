import Product from "../models/product.js";
import category from "../models/category.js";
import mongoose from "mongoose";
import { slugify, unslugify } from "@bbuukk/slugtrans/slugify";
import {
  transliterate,
  untransliterate,
} from "@bbuukk/slugtrans/transliterate";

export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id).populate("category");

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
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
    .select("name brand price images characteristics") // specify the fields you need
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

//todo delete
export const test = async (req, res) => {
  const filters = {
    Бренд: [
      "Ройчер",
      "Josera",
      "Golden Cat",
      "Pet Daily Cat",
      "Carnie",
      "Мяу!",
      "Клуб 4 Лапи",
      "Optimeal",
      "Пан Кот",
      "Trixie",
      "Brit",
      "Royal Canin",
      "Gourmet",
      "Purina One",
      "Purina Felix",
      "Purina Pro Plan",
      "Purina Cat Chow",
      "Purina Friskies",
      "Kitekat",
      "Whiskas",
      "Dreamies",
      "Nutra 5 Stars",
      "Miss Kiss",
      "Catessy",
      "Без Бренду",
    ],
    Тип: ["Вологий корм", "Сухий корм"],
    Вік: ["0-0.5", "0.5-2", "2.1-6", "6.1-10", "10.1-15", "15-Infinity"],
    Вага: ["0-0.5", "0.5-2", "2.1-6", "6.1-10", "10.1-15", "15-Infinity"],
    Порода: ["Довгошерсті", "Короткошерсті", "Усі породи"],
    Клас: ["Преміум", "Суперпреміум", "Холістик"],
    "Основні Інгредієнти": [
      "Індичка",
      "Злаки",
      "Качка",
      "Курка",
      "Лосось",
      "М'ясне асорті",
      "Птах",
      "Риба",
      "Свинина",
      "Телятина",
    ],
    Пакування: ["Консерви", "Мішок", "Паучі", "Коробка", "Пакетик"],
  };

  const parentCategoryPath = "Для Котів,Корм та Смаколики";
  const categories = await category
    .find({
      path: new RegExp(parentCategoryPath, "i"),
    })
    .select("name order path imagePath")
    .exec();

  const activeCategoryIds = categories.map((category) => category._id);
  // console.log("🚀 ~ activeCategoryIds:", activeCategoryIds);

  for (const [key, value] of Object.entries(filters)) {
    for (const option of value) {
      const regex = new RegExp(option, "i"); // Case-insensitive regex

      const products = await Product.find({
        $and: [
          { category: { $in: activeCategoryIds } },
          { $or: [{ name: regex }, { "description.Опис": regex }] },
        ],
      });

      for (let product of products) {
        if (!product.characteristics.has(key)) {
          product.characteristics.set(key, []);
        }

        if (!product.characteristics.get(key).includes(option)) {
          product.characteristics.get(key).push(option);
        }

        product.markModified("characteristics");

        try {
          await product.save();
          console.log(`Successfully updated product for key ${key}.`);
        } catch (err) {
          console.error(`Error updating product for key ${key}:`, err);
        }
      }
    }
  }

  res.status(200).json({});
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

export const getProductsByCategoryPathTest = async (req, res) => {
  let { categoryPath } = req.params;
  let { pageId } = req.query;

  const categoryPathOriginal = untransliterate(unslugify(categoryPath));
  const activeCategory = await category.findOne({
    path: new RegExp(`^${categoryPathOriginal.toLowerCase()}$`, "i"),
  });

  if (activeCategory == null) {
    return res
      .status(404)
      .json({ message: "Category with this path is not found" });
  }

  activeCategory.filters.map((f) => {
    const slugFilter = slugify(transliterate(f));
    if (req.query[slugFilter]) {
    }
  });

  const categories = await category
    .find({
      path: new RegExp(categoryPathOriginal, "i"),
    })
    .select("name order path imagePath")
    .exec();

  const activeCategoryIds = categories.map((category) => category._id);

  const foo1 = await Product.find({
    "characteristics.Тип": { $exists: true, $eq: ["Вазони"] },
  });
  ``;

  console.log(foo1);

  const foo = await Product.find({
    $and: [
      { category: { $in: activeCategoryIds } },
      {
        $or: [
          { "characteristics.Об'єм": { $exists: true, $ne: [] } },
          { "characteristics.Колір": { $exists: true, $ne: [] } },
          { "characteristics.Тип": { $exists: true, $ne: [] } },
        ],
      },
    ],
  });

  let query = Product.find({
    category: { $in: activeCategoryIds },
  })
    .select("name price images characteristics") // specify the fields you need
    .sort({ createdAt: -1 })
    .populate("category");

  if (pageId != 0) {
    const PRODUCTS_ON_PAGE = 50;
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
