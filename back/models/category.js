import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model("category", categorySchema);
