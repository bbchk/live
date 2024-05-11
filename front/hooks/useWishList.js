import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import useSyncWishList from './use_sync_wish_list'
import * as wishList from 'store/slices/wish_list.slice'

export const useWishList = () => {
  const dispatch = useDispatch()
  const { wishList: wshl } = useSelector((state) => state.wishList)

  const sync = useSyncWishList()

  //sync with localStorage and db on unmount
  useEffect(() => {
    //todo if we have a wishList in session and it is different from local storage we need to sync it on component mount
    return () => {
      const syncData = async () => {
        await sync()
      }
      syncData()
    }
  }, [])

  const addToWishList = async (productId) => {
    dispatch(wishList.add(productId))
  }

  const removeFromWishList = async (productId) => {
    dispatch(wishList.remove(productId))
  }

  async function like() {
    if (!wshl.includes(this._id)) {
      addToWishList(this._id)
    } else {
      removeFromWishList(this._id)
    }
  }

  return [wshl, like]
}
