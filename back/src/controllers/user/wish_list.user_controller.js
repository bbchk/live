import * as wishList from '#src/services/user/wish_list.service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'

export const sync = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params

  const wishListToSync = req.body

  const syncedWishList = await wishList.sync(userId, wishListToSync)

  res.status(200).json(syncedWishList)
})

export const add = asyncErrorHandler(async (req, res, next) => {
  const { userId, productId } = req.params

  await wishList.add(userId, productId)

  res.status(200).json({
    message: `Product ${productId} added to the wishList successfully.`,
  })
})

export const remove = asyncErrorHandler(async (req, res, next) => {
  const { userId, productId } = req.params

  await wishList.remove(userId, productId)

  res.status(200).json({
    message: `Product ${productId} removed from the wishList successfully.`,
  })
})
