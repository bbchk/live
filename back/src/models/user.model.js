import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

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
    throw Error('Email and password fields cannot be blank')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

//todo add wishlist
userSchema.statics.signUp = async function (user) {
  const { firstName, secondName, email, password, localStorageCartJson } = user

  if (!email || !password) {
    throw Error('Email and password fields cannot be blank')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

  const isUserExists = await this.findOne({ email })
  if (isUserExists) {
    throw Error('Email already in use')
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
