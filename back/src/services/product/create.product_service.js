import Product from "#src/models/product.model.js";

export const createProduct = async (productData) => {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createProducts = async (productsData) => {
  try {
    const createdProducts = await Product.insertMany(productsData);
    return createdProducts;
  } catch (err) {
    throw new Error(err.message);
  }
};
