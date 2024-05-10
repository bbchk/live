import Product from '#src/models/product.model.js'

export const createProduct = async (productData) => {
  try {
    const product = await Product.create(productData)
    return product
  } catch (err) {
    throw new Error(err.message)
  }
}
