import { transliterate, untransliterate } from "./transliterate";

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w,-]+/g, "")
    .replace(/,/g, "/");
}

// Unslugify function
export function unslugify(text) {
  return text
    .replace(/-/g, " ")
    .replace(/\//g, ",")
    .replace(/\w\S*/g, function (txt) {
      // return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      return txt;
    });
}
