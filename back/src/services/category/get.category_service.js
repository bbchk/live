import category from "#src/models/category.model.js";

import { unslugify } from "@bbuukk/slugtrans/slugify";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";

export const getCategories = async () => {
  return await category.find({}).sort({ createdAt: -1 });
};

export const getCategoryBySlugPath = async (slugCategoryPath) => {
  const path = untransliterate(unslugify(slugCategoryPath));
  return await category.findOne({
    path: new RegExp(`^${path.toLowerCase()}$`, "i"),
  });
};

export const getSubcategories = async (
  parentCategory,
  requiredNestingLevel
) => {
  //todo validate requiredNestingLevel value

  if (parentCategory == null) {
    throw new Error("Parent category with such path is not found");
  }

  const allSubcategories = await category
    .find({
      path: new RegExp(parentCategory.path, "i"),
    })
    .select("name order path imagePath")
    .exec();

  const parentCatNestLevel = parentCategory.path.split(",").length;

  if (requiredNestingLevel) {
    function isAtRequiredNestingLevel(c) {
      const nestLevel = c.path.split(",").length;
      return nestLevel === parentCatNestLevel + requiredNestingLevel;
    }

    const subcategoriesExactLevelDeep = allSubcategories.filter(
      (category) =>
        category.name !== parentCategory.name &&
        isAtRequiredNestingLevel(category)
    );
    return subcategoriesExactLevelDeep;
  }

  return allSubcategories;
};
