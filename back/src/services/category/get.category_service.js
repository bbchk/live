import category from "#src/models/category.model.js";

export const getCategories = async () => {
  return await category.find({}).sort({ createdAt: -1 });
};

export const getSubcategories = async (
  parentCategorySlugPath,
  requiredNestingLevel
) => {
  //todo validate requiredNestingLevel value

  const parentCategoryPath = untransliterate(unslugify(parentCategorySlugPath));

  const parentCategory = await category.findOne({
    path: new RegExp(`^${parentCategoryPath.toLowerCase()}$`, "i"),
  });

  if (parentCategory == null) {
    throw new Error("Parent category with such path is not found");
  }

  const allSubcategories = await category
    .find({
      path: new RegExp(parentCategoryPath, "i"),
    })
    .select("name order path imagePath")
    .exec();

  const parentCatNestLevel = activeCategory.path.split(",").length;

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
};
