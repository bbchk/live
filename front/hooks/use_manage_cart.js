import { getSession, useSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'
import * as crtSlice from 'store/slices/wish_list.slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const ACTIONS = {
  syncCart: 'sync',
  setCart: 'set',
}
const { syncCart, setCart } = ACTIONS

//? pass init value
function useManageCart() {
  const dispatch = useDispatch()
  const [_, setValue] = useLocalStorage('cart', [])
  const { update } = useSession()

  //on onmount we use global state
  async function handle(cart, action) {
    let resultCart = cart

    const session = await getSession()
    if (session) {
      const authHeader = {
        Authorization: `Bearer ${session.user.token}`,
      }

      const isWishListDifferent =
        JSON.stringify(session.user.cart) !== JSON.stringify(cart)
      const isWishListEmpty = cart.length === 0

      if (isWishListDifferent && !isWishListEmpty) {
        let method = action === syncCart ? 'patch' : 'put'

        console.log('in')
        const response = await axios({
          method: method,
          url: `/user/cart/${session.user.id}/${action}`,
          data: cart,
          headers: authHeader,
        })
        resultCart = response.data

        await update({
          ...session,
          user: {
            ...session?.user,
            cart: resultCart,
          },
        })
      }
    }
    setValue(resultCart)
    dispatch(crtSlice.set(resultCart))
  }

  async function sync(cart) {
    try {
      handle(cart, syncCart)
    } catch (e) {
      //todo
    }
  }

  async function set(cart) {
    try {
      handle(cart, setCart)
    } catch (e) {
      //todo
    }
  }

  return [sync, set]
}

export default useManageCart
