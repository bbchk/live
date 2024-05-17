import express from 'express'
import { requireAuth } from '../middleware/auth.js'

import * as user from '#src/controllers/user/user.user_controller.js'
import * as cart from '#src/controllers/user/cart.user_controller.js'
import * as wishList from '#src/controllers/user/wish_list.user_controller.js'

const router = express.Router()

router.post('/signIn', user.signIn)
router.post('/signUp', user.signUp)

router.use(requireAuth)

router.patch('/personal-info/:userId', user.update)

router.patch('/cart/:userId/sync', cart.sync)
router.put('/cart/:userId/set', cart.set)

router.patch('/wish-list/:userId/sync', wishList.sync)
router.put('/wish-list/:userId/set', wishList.set)

export { router as userRoutes }
