import { getSession, useSession } from '../contexts/AuthContext'
import useLocalStorage from 'hooks/useLocalStorage'
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

  //on onmount we use global state
  async function handle(wishList, action) {
    let resultWishList = wishList

    const session = await getSession()
    if (session) {
      const authHeader = {
        Authorization: `Bearer ${session.user.token}`,
      }

      const isWishListDifferent =
        JSON.stringify(session.user.wishList) !== JSON.stringify(wishList)
      const isWishListEmpty = wishList.length === 0

      if (isWishListDifferent && !isWishListEmpty) {
        let method = action === syncWishList ? 'patch' : 'put'

        const response = await axios({
          method: method,
          url: `/user/wish-list/${session.user.id}/${action}`,
          data: wishList,
          headers: authHeader,
        })
        resultWishList = response.data

        await update({
          ...session,
          user: {
            ...session?.user,
            wishList: resultWishList,
          },
        })
      }
    }

    setValue(resultWishList)
    dispatch(wishListSlice.set(resultWishList))
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
