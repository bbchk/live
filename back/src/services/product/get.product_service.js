import Product from '#src/models/product.model.js'
import _Error from '#src/utils/error.js'
import { mongoose } from 'mongoose'
import {
  getSubcategories,
  getCategoryById,
  getCategoryBySlugPath,
} from '#src/services/category/get.category_service.js'
import { slugify, unslugify } from '@bbuukk/slugtrans/slugify'
import { transliterate, untransliterate } from '@bbuukk/slugtrans/transliterate'
import { sanitize, processForSE } from '@bbuukk/slugtrans/process'
import processAndGatherData from '#src/services/product/utils/get/process_and_gather_data.util.js'
import * as categoryService from '#src/services/category/get.category_service.js'

import { FOR_LISTING_PAGE } from '#src/services/product/utils/get/constants.js'

export const getProducts = async () => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .select('description name brand price images characteristics')
    .populate('category')
    .exec()

  return products
}

export const getKeywordsByCategory = async (catId) => {
  const activeCategory = await getCategoryById(catId)

  const subcategories = await getSubcategories(activeCategory)

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

export async function getByQuery(query, filtersStr) {
  query = untransliterate(unslugify(query))
  query = processForSE(sanitize(query))

  let productsQuery = Product.find({
    $text: { $search: query },
  }).select(FOR_LISTING_PAGE)

  const data = await processAndGatherData(productsQuery, filtersStr)

  return data
}

export async function getByCategoryAndFilters(slugCategoryPath, filtersStr) {
  const activeCategory = await getCategoryBySlugPath(slugCategoryPath)

  const subcategories = await getSubcategories(activeCategory)
  const subcategoriesIds = subcategories.map((c) => c._id)

  let dbQuery = Product.find({
    category: { $in: subcategoriesIds },
  }).select(FOR_LISTING_PAGE)

  const data = await processAndGatherData(dbQuery, filtersStr, activeCategory)

  const ONE_LEVEL_NESTED_DEEP = 1
  const directSubcategories = await categoryService.getSubcategories(
    activeCategory,
    ONE_LEVEL_NESTED_DEEP,
  )

  return { ...data, activeCategory, directSubcategories }
}
