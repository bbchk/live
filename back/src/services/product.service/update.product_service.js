import Product from "#src/models/product.model.js";

export const updateProduct = async (id, productData) => {
  const product = await Product.findById(id);
  if (!product) {
    return { error: "Product not found", status: 404 };
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    { ...productData },
    { new: true }
  );

  return { product: updatedProduct };
};
