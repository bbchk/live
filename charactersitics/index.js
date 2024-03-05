import { Schema, model } from "mongoose";
// Import Mongoose
import mongoose from "mongoose";

// Connection URL (replace with your MongoDB connection string)
const url =
  "mongodb+srv://developer:yzOqenVpy2NaGukz@green-next.0ayt1vk.mongodb.net/"; // Example URL

// Connect to the MongoDB server
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Access the database (replace 'mydb' with your database name)
const db = mongoose.connection.useDb("test");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: false,
      },
    ],
    price: {
      type: Number,
      required: false,
    },
    characteristics: {
      type: Map,
      of: [String],
      required: false,
    },
    description: {
      type: Map,
      of: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    left: {
      type: Number,
      required: false,
    },
    starRating: {
      type: Number,
      required: false,
    },
  },
  { timestamps: false }
);

const Product = db.model("Product", productSchema);

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

const category = db.model("category", categorySchema);

const filters = {
  Бренд: [
    "Ройчер",
    "Josera",
    "Golden Cat",
    "Pet Daily Cat",
    "Carnie",
    "Мяу!",
    "Клуб 4 Лапи",
    "Optimeal",
    "Пан Кот",
    "Trixie",
    "Brit",
    "Royal Canin",
    "Gourmet",
    "Purina One",
    "Purina Felix",
    "Purina Pro Plan",
    "Purina Cat Chow",
    "Purina Friskies",
    "Kitekat",
    "Whiskas",
    "Dreamies",
    "Nutra 5 Stars",
    "Miss Kiss",
    "Без Бренду",
  ],
  Тип: ["Вологий корм", "Сухий корм"],
  Вік: ["0-0.5", "0.5-2", "2.1-6", "6.1-10", "10.1-15", "15-Infinity"],
  Вага: ["0-0.5", "0.5-2", "2.1-6", "6.1-10", "10.1-15", "15-Infinity"],
  Порода: ["Довгошерсті", "Короткошерсті", "Усі породи"],
  Клас: ["Економ", "Преміум", "Суперпреміум", "Холістик"],
  "Основні Інгредієнти": [
    "Індичка",
    "Злаки",
    "Качка",
    "Курка",
    "Лосось",
    "М'ясне асорті",
    "Птах",
    "Риба",
    "Свинина",
    "Телятина",
  ],
  Пакування: ["Консерви", "Мішок", "Паучі", "Коробка", "Пакетик"],
};

const parentCategoryPath = "Для Котів,Корм та Смаколики";
const categories = await category
  .find({
    path: new RegExp(parentCategoryPath, "i"),
  })
  .select("name order path imagePath")
  .exec();

const activeCategoryIds = categories.map((category) => category._id);
console.log("🚀 ~ activeCategoryIds:", activeCategoryIds);

//debug
// const activeCategoryNames = categories.map((category) => category.path);
// console.log(activeCategoryNames);

for (const [filter, options] of Object.entries(filters)) {
  for (const option of options) {
    const regex = new RegExp(option, "i"); // Case-insensitive regex

    await Product.updateMany(
      {
        $and: [
          { category: { $in: activeCategoryIds } },
          { $or: [{ name: regex }, { description: regex }] },
        ],
      },
      {
        $set: {
          [`characteristics.${filter}`]: {
            $ifNull: [`$characteristics.${filter}`, []],
          },
        }, // Set the key to an empty array if it doesn't exist
        $addToSet: { [`characteristics.${filter}`]: [option] }, // Then add the option to the array
      }
    )
      .then((result) => {
        console.log(
          `Successfully updated ${result.modifiedCount} documents for filter ${filter}.`
        );
      })
      .catch((err) => {
        console.error(`Error updating documents for filter ${filter}:`, err);
      });
  }
}

// console.log(await Product.find({ _id: { $in: ["65b2606f213addb487b8aaac"] } }));
{
  _id: {
    $in: ["65ad3ec1864774208de09906"];
  }
}

// //todo delete
// export const test = async (req, res) => {
//   const filters = {
//     Бренд: [
//       "Ройчер",
//       "Josera",
//       "Golden Cat",
//       "Pet Daily Cat",
//       "Carnie",
//       "Мяу!",
//       "Клуб 4 Лапи",
//       "Optimeal",
//       "Пан Кот",
//       "Trixie",
//       "Brit",
//       "Royal Canin",
//       "Gourmet",
//       "Purina One",
//       "Purina Felix",
//       "Purina Pro Plan",
//       "Purina Cat Chow",
//       "Purina Friskies",
//       "Kitekat",
//       "Whiskas",
//       "Dreamies",
//       "Nutra 5 Stars",
//       "Miss Kiss",
//       "Catessy",
//       "Без Бренду",
//     ],
//     Тип: ["Вологий корм", "Сухий корм"],
//     Вік: ["0-0.5", "0.5-2", "2.1-6", "6.1-10", "10.1-15", "15-Infinity"],
//     Вага: ["0-0.5", "0.5-2", "2.1-6", "6.1-10", "10.1-15", "15-Infinity"],
//     Порода: ["Довгошерсті", "Короткошерсті", "Усі породи"],
//     Клас: ["Преміум", "Суперпреміум", "Холістик"],
//     "Основні Інгредієнти": [
//       "Індичка",
//       "Злаки",
//       "Качка",
//       "Курка",
//       "Лосось",
//       "М'ясне асорті",
//       "Птах",
//       "Риба",
//       "Свинина",
//       "Телятина",
//     ],
//     Пакування: ["Консерви", "Мішок", "Паучі", "Коробка", "Пакетик"],
//   };

//   const parentCategoryPath = "Для Котів,Корм та Смаколики";
//   const categories = await category
//     .find({
//       path: new RegExp(parentCategoryPath, "i"),
//     })
//     .select("name order path imagePath")
//     .exec();

//   const activeCategoryIds = categories.map((category) => category._id);
//   // console.log("🚀 ~ activeCategoryIds:", activeCategoryIds);

//   for (const [key, value] of Object.entries(filters)) {
//     for (const option of value) {
//       const regex = new RegExp(option, "i"); // Case-insensitive regex

//       const products = await Product.find({
//         $and: [
//           { category: { $in: activeCategoryIds } },
//           { $or: [{ name: regex }, { "description.Опис": regex }] },
//         ],
//       });

//       for (let product of products) {
//         if (!product.characteristics.has(key)) {
//           product.characteristics.set(key, []);
//         }

//         if (!product.characteristics.get(key).includes(option)) {
//           product.characteristics.get(key).push(option);
//         }

//         product.markModified("characteristics");

//         try {
//           await product.save();
//           console.log(`Successfully updated product for key ${key}.`);
//         } catch (err) {
//           console.error(`Error updating product for key ${key}:`, err);
//         }
//       }
//     }
//   }

//   res.status(200).json({});
// };
