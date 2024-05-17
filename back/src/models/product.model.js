import { Schema, model, Types } from 'mongoose'

//todo make certain fields required true
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: false,
      },
    ],
    price: {
      type: Number,
      required: false,
      // type: Types.Decimal128,
      // get: (v) => parseFloat(v.toString()),
      // set: (v) => Types.Decimal128.fromString(v.toString()),
    },
    characteristics: {
      type: Map,
      of: [String],
      required: false,
    },
    description: {
      type: String,
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
      min: 0,
      max: 5,
    },
    keywords: {
      type: [String],
      required: true,
    },
  },
  { timestamps: false },
)

// productSchema.set('toObject', { getters: true })
// productSchema.set('toJSON', { getters: true })

productSchema.index({ keywords: 'text' })

export default model('Product', productSchema)
