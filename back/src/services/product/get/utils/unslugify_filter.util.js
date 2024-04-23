import { untransliterate } from "@bbuukk/slugtrans/transliterate";
import { unslugify } from "@bbuukk/slugtrans/slugify";

export function unslugifyFilter({ slugKey, slugOptions }) {
  let key = untransliterate(unslugify(slugKey));
  key = key.charAt(0).toUpperCase() + key.slice(1);

  const options = slugOptions.map((value) => {
    return untransliterate(unslugify(value));
  });

  return { key, options };
}
