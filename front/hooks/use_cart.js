import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

// import todo from './use_sync_cart'
import * as crtSlice from 'store/slices/cart.slice'

import useLocalStorage from './useLocalStorage'

//todo
//todo when login in on catalog page, new likes are not saved

export const useCart = () => {
  const dispatch = useDispatch()
  const { cart, __ } = useSelector((state) => state.cart)

  const [localCart, setValue] = useLocalStorage('cart', [])

  const isSet = useRef(false)

  const [_, set] = useManageCart()

  useEffect(() => {
    ;async () => {
      /* 
        when user reload page
        if user has change wishList
        we need to set new state to user.wishList
        as cleanup function does not work on page reload
        */

      if (!isSet.current) {
        ;(async () => await set(localCart))()
      }
      isSet.current = true
    }
  }, [])

  //sync with localStorage and db on component unmount
  const cartRef = useRef(cart)
  cartRef.current = cart
  useEffect(() => {
    return () => {
      ;(async () => await set(cartRef.current))()
    }
  }, [])

  //save to localStorage if user reloads or closes page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setValue(cartRef.current)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  //actions
  async function add() {
    dispatch(crtSlice.add(this))
  }

  async function remove() {
    dispatch(crtSlice.removeOne(this))
  }

  async function removeAll() {
    dispatch(crtSlice.removeAll(this))
  }

  return [cart, add, remove, removeAll]
}
