import { Schema, model } from "mongoose";

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

export default model("category", categorySchema);
