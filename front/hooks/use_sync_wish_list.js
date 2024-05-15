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

  // //on login we use local storage
  // //on onmount we use global state

  async function foo(wishList) {}

  async function sync(wishList) {
    const session = await getSession()

    if (session) {
      const authHeader = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }

      //we send localstorage on login and redux state on unmount

      // console.log(session.user.wishList)
      // console.log(wishList)
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
          // console.log('🚀 ~ resultWishList:', resultWishList)
        } catch (e) {
          //todo
        }
      }
      setValue(resultWishList)
      dispatch(wishListSlice.set(resultWishList))

      // console.log('🚀 ~ session:', session)
      await update({
        ...session,
        user: {
          ...session?.user,
          wishList: resultWishList,
        },
      })
    } else {
      // console.log('🚀 ~ wishList:', wishList)
      setValue(wishList)
      // dispatch(wishListSlice.set(wishList)) // we dispatch in in useWishList
    }
  }

  async function set(wishList) {
    const session = await getSession()

    if (session) {
      const authHeader = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }

      //we send localstorage on login and redux state on unmount

      // console.log(session.user.wishList)
      // console.log(wishList)
      //?it solves it?

      //todo if we have a wishList in session and it is different from local storage we need to sync it on component mount

      const isWishListDifferent =
        JSON.stringify(session.user.wishList) !== JSON.stringify(wishList)
      const isWishListEmpty = wishList.length === 0

      let resultWishList = wishList
      if (isWishListDifferent && !isWishListEmpty) {
        try {
          const response = await axios.put(
            `/user/wish-list/${session.user.id}/set`,
            wishList,
            authHeader,
          )
          resultWishList = response.data
          // console.log('🚀 ~ resultWishList:', resultWishList)
        } catch (e) {
          //todo
        }
      }
      setValue(resultWishList)
      dispatch(wishListSlice.set(resultWishList))

      // console.log('🚀 ~ session:', session)
      await update({
        ...session,
        user: {
          ...session?.user,
          wishList: resultWishList,
        },
      })
    } else {
      // console.log('🚀 ~ wishList:', wishList)
      setValue(wishList)
      // dispatch(wishListSlice.set(wishList)) // we dispatch in in useWishList
    }
  }

  return { sync, set }
}

export default useSyncWishList
