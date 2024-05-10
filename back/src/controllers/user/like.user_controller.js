import * as userService from '#src/services/user/like.service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'

export const addLikedProduct = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.query
  const product = req.body

  await userService.addLikedProduct(userId, product)
  res.status(200).json({ message: 'Product liked successfully.' })
})
