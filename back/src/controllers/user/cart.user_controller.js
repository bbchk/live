import * as cart from '#src/services/user/cart.service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'

export const sync = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params
  const cartToSync = req.body

  const syncedCart = await cart.sync(userId, cartToSync)

  res.status(200).json(syncedCart)
})

export const set = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params
  const cartToSet = req.body

  const resCart = await cart.set(userId, cartToSet)

  res.status(200).json(resCart)
})
