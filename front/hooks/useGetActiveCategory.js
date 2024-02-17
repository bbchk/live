import { unslugify } from "root/utils/slugify";
import { untransliterate } from "root/utils/transliterate";

export const useGetActiveCategory = () => {
  function getActiveCategory(activeCategoryPath, allCategories) {
    const pathString = untransliterate(unslugify(activeCategoryPath));

    return allCategories.find(
      (category) => category.path.toLowerCase() == pathString
    );
  }

  return { getActiveCategory };
};
