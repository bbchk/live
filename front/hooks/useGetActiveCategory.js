import { unslugify } from "@bbuukk/slugtrans/slugify";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";

export const useGetActiveCategory = () => {
  function getActiveCategory(activeCategoryPath, allCategories) {
    const pathString = untransliterate(unslugify(activeCategoryPath));

    return allCategories.find(
      (category) => category.path.toLowerCase() == pathString
    );
  }

  return { getActiveCategory };
};
