import { getSession, useSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'
import * as wishListSlice from 'store/slices/wish_list.slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

//? pass init value
function useSyncWishList() {
  const dispatch = useDispatch()
  const [_, setValue] = useLocalStorage('wish_list', [])
  const { update } = useSession()

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

      let resultWishList = wishList
      if (isWishListDifferent && !isWishListEmpty) {
        try {
          const response = await axios.patch(
            `/user/wish-list/${session.user.id}/sync`,
            wishList,
            authHeader,
          )
          resultWishList = response.data
        } catch (e) {
          //todo
        }
      }
      setValue(resultWishList)
      dispatch(wishListSlice.set(resultWishList))

      console.log('🚀 ~ session:', session)
      await update({
        ...session,
        user: {
          ...session?.user,
          wishList: resultWishList,
        },
      })
    } else {
      setValue(wishList)
      // dispatch(wishListSlice.set(wishList)) // we dispatch in in useWishList
    }
  }
}

export default useSyncWishList
