import Product from "#src/models/product.model.js";
import _Error from "#src/utils/error.js";

export const updateProduct = async (id, productData) => {
  const product = await Product.findById(id);

  if (!product) throw new _Error(`Product with id ${id} not found.`, 404);

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    { ...productData },
    { new: true }
  );

  return { product: updatedProduct };
};
