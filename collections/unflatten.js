import slugify from "slugify";

// Your flattened table data
const numbers = ["70218", "70219", "70220", "70446"];
const productNames = [
  "Фіалка Чорний Король 0.05г",
  "Квасоля Червона Шапочка кущова 20г",
  "Крiп Алiгатор 15 г",
  "Матіола дворога Sr",
];
const barcodes = [
  "4823099809172",
  "4823069861902",
  "4823069918606",
  "4823099812424",
];

// Initialize an empty array for the table
let table = [];

// Loop through the data and add each row to the table
for (let i = 0; i < numbers.length; i++) {
  let row = { code: numbers[i], name: productNames[i], barcode: barcodes[i] };
  table.push(row);
}

// Now 'table' is a 2D array representing your table
console.log(table);
console.log("\n");

let jsonObjects = [];

table.forEach((row) => {
  let nameEnglish = slugify(row["name"], {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "ua", // language code of the locale to use
  });

  let match = row["name"].match(/\d+(,\d+)?\s*гр/g);
  let weight = match ? match[0] : "unknown";

  let jsonObject = {
    brand: "Яскрава",
    name: row["name"],
    category: "654fcdaf0cb31d285bd7e951",
    price: "10",
    weight: weight,
    left: 1,
    starRating: 0,
    packing: "Пакетик",
    description: "",
    imageUrl: "/products/yaskrava/" + nameEnglish,
    code: row["code"],
    barcode: row["barcode"],
  };

  jsonObjects.push(jsonObject);
});

// Now jsonObjects contains your desired JSON objects
console.log(jsonObjects);
