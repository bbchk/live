import slugify from "slugify";
// const slugify = require("slugify");

export function makeSlug(text) {
  const slug = slugify(text, {
    lower: true, // convert to lower case
    strict: true, // strip special characters except replacement
    locale: "uk", // Ukrainian locale
  });

  return slug;
}
