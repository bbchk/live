// Transliteration map from Ukrainian to English
const transliterationMap = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "iu",
  я: "ya",
  ",": ",",
  " ": " ",
};

// Reverse mapping for untransliteration
const untransliterationMap = {};
for (let key in transliterationMap) {
  untransliterationMap[transliterationMap[key]] = key;
}

// Transliterate function
export function transliterate(text) {
  const lowercase_text = text.toLowerCase();

  let result = "";
  for (let char of lowercase_text) {
    result += transliterationMap[char] || char;
  }
  return result;
}

export function untransliterate(text) {
  let result = "";

  const keys = Object.keys(untransliterationMap).sort(
    (a, b) => b.length - a.length
  );

  for (let i = 0; i < text.length; ) {
    for (let key of keys) {
      if (text.startsWith(key, i)) {
        result += untransliterationMap[key];
        i += key.length;
        break;
      }
    }
  }

  return result;
}
