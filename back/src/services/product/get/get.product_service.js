import Product from '#src/models/product.model.js'
import _Error from '#src/utils/error.js'
import { mongoose } from 'mongoose'
import {
  getSubcategories,
  getCategoryById,
} from '#src/services/category/get.category_service.js'
import { slugify, unslugify } from '@bbuukk/slugtrans/slugify'
import { transliterate, untransliterate } from '@bbuukk/slugtrans/transliterate'
import { sanitize, processForSE } from '@bbuukk/slugtrans/process'

export const getProducts = async () => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .select('description name brand price images characteristics')
    .populate('category')
    .exec()

  return products
}

export const getProductsByQuery = async (query) => {
  query = untransliterate(unslugify(query))
  query = processForSE(sanitize(query))

  const result = await Product.find({
    $text: { $search: query },
  })
    .select('description name brand price images characteristics')
    .populate('category')
    .exec()

  return result
}

export const getKeywordsByCategory = async (catId) => {
  const activeCategory = await getCategoryById(catId)

  const subcategories = await getSubcategories(activeCategory)
  console.log('🚀 ~ subcategoriesIds:', subcategories)

  const subcategoriesIds = subcategories.map((c) => c._id)

  return await Product.find({
    category: { $in: subcategoriesIds },
  })
    .select('keywords')
    .exec()
}

export const getProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw _Error('Product id is not valid', 404)
  }

  const product = await Product.findById(id).populate('category')

  if (!product) {
    throw _Error('No such product', 404)
  }

  return product
}

export const getProductsByIds = async (productIds) => {
  const products = await Product.find({
    _id: { $in: productIds },
  })
  return products
}
