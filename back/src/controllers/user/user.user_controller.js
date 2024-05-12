import * as userService from '#src/services/user/user.service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'

export const signIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body

  const { user, token } = await userService.signIn(email, password)

  res.status(200).json({
    id: user._id,
    firstName: user.firstName,
    secondName: user.secondName,
    email: email,
    token: token,
    likedProducts: user.likedProducts,
    wishList: user.wishList,
    cart: user.cart,
    image: user.image,
  })
})

export const signUp = asyncErrorHandler(async (req, res, next) => {
  const user = { ...req.body }

  const newUser = await userService.signUp(user)

  res.status(200).json({
    ...newUser,
  })
})

export const update = asyncErrorHandler(async (req, res, next) => {
  //todo validate updatedData/ password email, etc
  const { userId } = req.params
  const updatedData = req.body

  const updatedUser = await userService.update(userId, updatedData)

  res.status(200).json({
    ...updatedUser,
  })
})
