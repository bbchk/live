import Product from '#src/models/product.model.js'

export const deleteProduct = async (id) => {
  const product = await Product.findById(id)
  if (!product) {
    return { error: 'Product not found', status: 404 }
  }

  await Product.deleteOne({ _id: id })
  return { product }
}
