import express from 'express'
import { requireAuth } from '../middleware/auth.js'

import { signIn, signUp } from '#src/controllers/user/auth.user_controller.js'

import {
  addCartItem,
  syncCart,
  getCart,
  deleteCartItem,
} from '#src/controllers/user/cart.user_controller.js'

// import { syncWishList } from '#src/controllers/user/wish_list.user_controller.js'
import * as wishList from '#src/controllers/user/wish_list.user_controller.js'

const router = express.Router()

router.post('/signIn', signIn)
router.post('/signUp', signUp)

router.use(requireAuth)

router.get('/cart/:userId/fetch', getCart)
router.patch('/cart/:userId/sync', syncCart)
router.post('/cart/:userId/add/:productId', addCartItem)
router.delete('/cart/:userId/delete/:productId', deleteCartItem)

router.patch('/wish-list/:userId/sync', wishList.sync)
router.post('/wish-list/:userId/add/:productId', wishList.add)
router.delete('/wish-list/:userId/delete/:productId', wishList.remove)

export { router as userRoutes }
