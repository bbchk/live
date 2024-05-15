import { getSession, useSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'
import * as wishListSlice from 'store/slices/wish_list.slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const ACTIONS = {
  syncWishList: 'sync',
  setWishList: 'set',
}
const { syncWishList, setWishList } = ACTIONS

//? pass init value
function useSyncWishList() {
  const dispatch = useDispatch()
  const [_, setValue] = useLocalStorage('wish_list', [])
  const { update } = useSession()

  // //on login we use local storage
  // //on onmount we use global state

  async function handle(wishList, action) {
    const session = await getSession()

    if (session) {
      const authHeader = {
        Authorization: `Bearer ${session.user.token}`,
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
        let method = action === syncWishList ? 'patch' : 'put'

        const response = await axios({
          method: method,
          url: `/user/wish-list/${session.user.id}/${action}`,
          data: wishList,
          headers: authHeader,
        })
        resultWishList = response.data
      }
      setValue(resultWishList)
      dispatch(wishListSlice.set(resultWishList))

      //do we need to update session if don't sync of set?
      await update({
        ...session,
        user: {
          ...session?.user,
          wishList: resultWishList,
        },
      })
    } else {
      setValue(wishList)
      dispatch(wishList.set(wishList))
    }
  }

  async function sync(wishList) {
    try {
      handle(wishList, syncWishList)
    } catch (e) {
      //todo
    }
  }

  async function set(wishList) {
    try {
      handle(wishList, setWishList)
    } catch (e) {
      //todo
    }
  }

  return [sync, set]
}

export default useSyncWishList
