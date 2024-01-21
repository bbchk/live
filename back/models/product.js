import { Schema, model } from "mongoose";

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
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    characteristics: {
      type: Map,
      of: String,
      required: false,
    },
    description: {
      type: Map,
      of: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
