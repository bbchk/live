const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    size: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    color: {
      type: [String],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
    },
    packing: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
