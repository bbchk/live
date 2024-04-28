import { readJsonFile } from "#src/__tests__/utils/readJson.js";
import mongoose from "mongoose";

import category from "#src/models/category.model.js";
import Product from "#src/models/product.model.js";
import User from "#src/models/user.model.js";

import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri("test");
  await mongoose.connect(mongoUri);

  const categories = readJsonFile("src/__tests__/test_data/categories.json");
  const products = readJsonFile("src/__tests__/test_data/products.json");

  await category.insertMany(categories);
  await Product.insertMany(products);
}

export async function populateWithTestData() {
  const categories = readJsonFile("src/__tests__/test_data/categories.json");
  const products = readJsonFile("src/__tests__/test_data/products.json");
  const users = readJsonFile("src/__tests__/test_data/users.json");
  console.log("🚀 ~ users:", users)

  await category.insertMany(categories);
  await Product.insertMany(products);
  await User.insertMany(users);
}

export async function clearDatabase() {
  // await mongoose.connection.db.dropDatabase();
  await category.deleteMany();
  await Product.deleteMany();
}

export async function disconnect() {
  await mongoose.disconnect();
  await mongoServer.stop();
  await mongoose.connection.close();
}
