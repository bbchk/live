import { getSession, useSession } from 'next-auth/react'
import useLocalStorage from 'hooks/useLocalStorage'
import * as crtSlice from 'store/slices/cart.slice'
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
      console.log(session)
      const authHeader = {
        Authorization: `Bearer ${session.user.token}`,
      }

      const isCartDiff =
        JSON.stringify(session.user.cart) !== JSON.stringify(cart)
      const isLocalCartEmpty = cart.length === 0

      if (isCartDiff && !isLocalCartEmpty) {
        let method = action === syncCart ? 'patch' : 'put'

        console.log(session)
        console.log(cart)

        const minifiedCart = cart.map((p) => {
          return {
            product: p._id,
            quantity: p.quantity,
          }
        })
        console.log('🚀 ~ minifiedCart:', minifiedCart)

        const response = await axios({
          method: method,
          url: `/user/cart/${session.user.id}/${action}`,
          data: minifiedCart,
          headers: authHeader,
        })
        resultCart = response.data

        resultCart = resultCart.map(({ product, quantity }) => {
          return { ...product, quantity }
        })
        console.log('🚀 ~ resultCart:', resultCart)

        await update({
          ...session,
          user: {
            ...session?.user,
            cart: resultCart,
          },
        })
      }

      const isSessionCartEmpty = session.user.cart.length === 0
      console.log('🚀 ~ isSessionCartEmpty:', isSessionCartEmpty)
      if (!isSessionCartEmpty && isLocalCartEmpty) {
        resultCart = session.user.cart
        console.log('🚀 ~ resultCart:', resultCart)
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
