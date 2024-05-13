import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Ім'я є обов'язовим полем"],
  },
  order: {
    type: Number,
    required: [true, "Порядок є обов'язовим полем"],
  },
  path: {
    type: String,
    required: [true, "Шлях є обов'язовим полем"],
    unique: [true, 'Категорія з таким шляхом вже існує'],
  },
  imagePath: {
    type: String,
    required: [true, "Зображення є обов'язовим"],
  },
  filters: {
    type: [String],
    required: false,
  },
})

export default model('category', categorySchema)
