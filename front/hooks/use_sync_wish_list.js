import { getSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'
import * as wishListSlice from 'store/slices/wish_list.slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { use } from 'react'

//? pass init value
function useSyncWishList() {
  const dispatch = useDispatch()
  const [_, setValue] = useLocalStorage('wish_list', [])
  // const { status } = useSelector((state) => state.wishList)

  //on login we use local storage
  //on onmount we use global state
  return async function sync(wishList) {
    const session = await getSession()

    if (session) {
      const authHeader = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }

      //?it solves it?
      //todo if we have a wishList in session and it is different from local storage we need to sync it on component mount
      const isWishListDifferent =
        JSON.stringify(session.user.wishList) !== JSON.stringify(wishList)
      const isWishListEmpty = wishList.length === 0

      console.log(isWishListDifferent && !isWishListEmpty)
      if (isWishListDifferent && !isWishListEmpty) {
        try {
          const response = await axios.patch(
            `/user/wish-list/${session.user.id}/sync`,
            wishList,
            authHeader,
          )
          const syncedWishList = response.data
          setValue(syncedWishList)
          dispatch(wishListSlice.set(syncedWishList))
        } catch (e) {}
      } else {
        //? need it?
        setValue(wishList)
        dispatch(wishListSlice.set(wishList))
      }
    } else {
      setValue(wishList)
      // dispatch(wishListSlice.set(wishList))
    }
  }
}

export default useSyncWishList
