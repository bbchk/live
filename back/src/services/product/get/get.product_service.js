import Product from '#src/models/product.model.js';
import { mongoose } from 'mongoose';

export const getProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { error: 'No such product', status: 404 };
  }

  const product = await Product.findById(id).populate('category');

  if (!product) {
    return { error: 'No such product', status: 400 };
  }

  return { product };
};

export const getProductsByIds = async (productIds) => {
  try {
    const products = await Product.find({
      _id: { $in: productIds },
    });
    return { products };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProducts = async () => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .select('description name brand price images characteristics')
    .populate('category')
    .exec();

  return { products };
};
