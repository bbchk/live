import category from '#src/models/category.model.js'
import _Error from '#src/utils/error.js'
import { mongoose } from 'mongoose'

import { unslugify } from '@bbuukk/slugtrans/slugify'
import { untransliterate } from '@bbuukk/slugtrans/transliterate'

export const getCategories = async () => {
  return await category.find({}).sort({ createdAt: -1 })
}

export const getCategoryById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw _Error('Category id is not valid', 404)
  }

  const result = await category.findById(id).exec()

  if (!result) {
    throw _Error('No such category', 404)
  }

  return result
}

export const getRootCategories = async () => {
  const addNestLevel = () => ({
    $addFields: {
      nestLevel: { $size: { $split: ['$path', ','] } },
    },
  })

  const matchNestLevel = (length) => ({
    $match: { nestLevel: length },
  })

  const sortByOrder = () => ({
    $sort: { order: 1 },
  })

  const rootCats = await category.aggregate([
    addNestLevel(),
    matchNestLevel(1),
    sortByOrder(),
  ])

  const result = await Promise.all(
    rootCats.map(async (rc) => {
      const subcats = await category.aggregate([
        addNestLevel(),
        matchNestLevel(2),
        { $match: { path: { $regex: rc.path, $options: 'i' } } },
        sortByOrder(),
        { $limit: 5 },
      ])

      return { ...rc, subcats }
    }),
  )

  return result
}

export const getCategoryBySlugPath = async (slugCategoryPath) => {
  const path = untransliterate(unslugify(slugCategoryPath))
  return await category.findOne({
    path: new RegExp(`^${path.toLowerCase()}$`, 'i'),
  })
}

export const getSubcategories = async (
  parentCategory,
  requiredNestingLevel,
) => {
  //todo validate requiredNestingLevel value

  if (parentCategory == null) {
    throw new Error('Parent category with such path is not found')
  }

  const allSubcategories = await category
    .find({
      path: new RegExp(parentCategory.path, 'i'),
    })
    .sort({ order: 1 })
    .select('name order path imagePath')
    .exec()

  const parentCatNestLevel = parentCategory.path.split(',').length

  if (requiredNestingLevel) {
    function isAtRequiredNestingLevel(c) {
      const nestLevel = c.path.split(',').length
      return nestLevel === parentCatNestLevel + requiredNestingLevel
    }

    const subcategoriesExactLevelDeep = allSubcategories.filter(
      (category) =>
        category.name !== parentCategory.name &&
        isAtRequiredNestingLevel(category),
    )
    return subcategoriesExactLevelDeep
  }

  return allSubcategories
}
