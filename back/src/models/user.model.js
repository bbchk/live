import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import _Error from '#src/utils/error.js'

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Ім'я є обов'язовим полем"],
    },
    secondName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Пошта є обов'язовим полем"],
      lowercase: true,
      unique: [true, 'Користувач з цієї поштою вже зареєстрований'],
    },
    password: {
      type: String,
      required: [true, "Пароль є обов'язовим полем"],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
      },
    ],
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: function () {
            return this.quantity != null
          },
        },
        quantity: {
          type: Number,
          required: function () {
            return this.product != null
          },
        },
      },
    ],
  },
  { timestamps: true },
)

userSchema.pre('save', function (next) {
  this.wishList = [...new Set(this.wishList)]
  next()
})

userSchema.statics.signIn = async function (email, password) {
  if (!email || !password) {
    throw new _Error(`Пошта чи пароль не можу бути відсутніми`, 400)
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw new _Error(`Користувача з такою поштою не знайдено`, 404)
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new _Error(`Пароль не є правильним`, 401)
  }

  return user
}

//todo add wishlist
userSchema.statics.signUp = async function (user) {
  const { firstName, secondName, email, password, localStorageCartJson } = user

  if (!email || !password) {
    throw new _Error(`Пошта чи пароль не можу бути відсутніми`, 400)
  }

  if (!validator.isEmail(email)) {
    throw new _Error(`Такої пошти не існує`, 400)
  }

  if (!validator.isStrongPassword(password)) {
    throw new _Error(`Пароль не достатньо сильний`, 400)
  }

  const isUserExists = await this.findOne({ email })
  if (isUserExists) {
    throw new _Error(`Пошта уже використовується`, 409)
  }

  const hash = await bcrypt.hash(password, 10)

  const min = 0
  const max = 4
  const randomImageIdx = Math.floor(Math.random() * (max - min + 1)) + min
  const defaultUserImage = `https://storage.googleapis.com/live_world/users/user${randomImageIdx}.jpg`

  const newUser = await this.create({
    firstName: firstName,
    secondName: secondName,
    email: email,
    password: hash,
    image: defaultUserImage,
    cart: localStorageCartJson,
    // wishList: user.wishList
  })

  {
    let newUserDoc = newUser._doc
    let { firstName, secondName, email, image, likedProducts, cart, _id } =
      newUserDoc

    return { firstName, secondName, email, image, likedProducts, cart, _id }
  }
}

export default model('User', userSchema)
