import { untransliterate } from "@bbuukk/slugtrans/transliterate";
import { unslugify } from "@bbuukk/slugtrans/slugify";

export function unslugifyFilter({ filterName, filterValues }) {
  let originalFilterName = untransliterate(unslugify(filterName));
  originalFilterName =
    originalFilterName.charAt(0).toUpperCase() + originalFilterName.slice(1);

  const originalFilterValues = filterValues.map((value) => {
    return untransliterate(unslugify(value));
  });

  return { originalFilterName, originalFilterValues };
}
