import { getSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'
import * as wishListSlice from 'store/slices/wish_list.slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//? pass init value
function useSyncWishList() {
  const dispatch = useDispatch()
  const { wishList: list, status } = useSelector((state) => state.wishList)
  const [wishList, setValue] = useLocalStorage('wish_list', [])

  return async function sync() {
    const session = await getSession()
    console.log('🚀 ~ session:', session)

    if (session) {
      const authHeader = {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }

      const isWishListDifferent =
        JSON.stringify(session.user.wishList) !== JSON.stringify(wishList)
      const isWishListEmpty = wishList.length === 0

      console.log(isWishListDifferent || !isWishListEmpty)
      if (isWishListDifferent || !isWishListEmpty) {
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
        dispatch(wishListSlice.set(wishList))
      }
    } else {
      setValue(list)
      // dispatch(wishListSlice.set(wishList))
    }
  }
}

export default useSyncWishList

//   const dispatch = useDispatch()
//   const status = useSelector((state) => state.wishList.status)
//   useEffect(() => {
//     if (status !== 'idle') {
//       dispatch(set(wishList))
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch])
