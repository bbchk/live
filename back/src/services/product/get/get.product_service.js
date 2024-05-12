import Product from '#src/models/product.model.js'
import _Error from '#src/utils/error.js'
import { mongoose } from 'mongoose'
import {
  getSubcategories,
  getCategoryById,
} from '#src/services/category/get.category_service.js'
import { updateProducts } from '#src/services/product/update.product_service.js'

export const getProducts = async () => {
  // const products = await Product.find({})
  //   .sort({ createdAt: -1 })
  //   .select('description name brand price images characteristics')
  //   .populate('category')
  //   .exec()

  // return products

  function process(str) {
    const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
    const html = /<[^>]*>/g
    const whspace = /\s+/

    let words = str
      .replace(html, '')
      .replace(punctuation, '')
      .toLowerCase()
      .split(whspace)

    /* Remove the last letter from each word 
      and filter out words shorter than 2 characters */
    const prsWords = words
      .map((word) => word.slice(0, -1))
      .filter((word) => word.length >= 3)

    return prsWords.join(' ')
  }

  function stringify(product) {
    const name = product.name
    const descr = product.description
    return process(`${name} ${descr}`)
  }

  function getKeywords(text) {
    // Split the text into words
    let words = text?.split(' ') || []

    // Count the frequency of each word
    let wordFrequency = {}
    words.forEach((word) => {
      if (word) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1
      }
    })

    // Sort the words by frequency
    let sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])

    return sortedWords.map((word) => word[0])
  }

  const products = await Product.find({}).sort({ createdAt: -1 }).exec()
  const MAX_KEYWORDS = 20

  const productsKws = products.map((product) => {
    const productString = stringify(product)

    const allKeywords = getKeywords(productString)

    const processedName = process(product.name)
    const nameKeywords = getKeywords(processedName)

    const remainingKeywords = MAX_KEYWORDS - nameKeywords.length
    const additionalKeywords =
      remainingKeywords > 0 ? allKeywords.slice(0, remainingKeywords) : []

    return {
      id: product._id,
      productData: {
        keywords: Array.from(new Set([...nameKeywords, ...additionalKeywords])),
      },
    }
  })

  // updateProducts
  const result = await updateProducts(productsKws)

  return [result]
  // return [productsKws]
}

// Product.find({ $text: { $search: "some keywords" } })

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
