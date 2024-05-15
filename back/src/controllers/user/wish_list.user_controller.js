import * as wishList from '#src/services/user/wish_list.service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'

export const sync = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params

  const wishListToSync = req.body

  const syncedWishList = await wishList.sync(userId, wishListToSync)

  res.status(200).json(syncedWishList)
})

export const set = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params
  const wishListToSync = req.body

  const syncedWishList = await wishList.set(userId, wishListToSync)

  res.status(200).json(syncedWishList)
})
