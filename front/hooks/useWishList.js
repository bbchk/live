import { useDispatch, useSelector } from 'react-redux'

import { useCallback, useEffect, useRef } from 'react'
import useSyncWishList from './use_sync_wish_list'
import * as wishList from 'store/slices/wish_list.slice'
import { getSession, useSession } from 'next-auth/react'
import useLocalStorage from './useLocalStorage'

export const useWishList = () => {
  const dispatch = useDispatch()
  const { wishList: wshl, status } = useSelector((state) => state.wishList)

  const [localStWishList, setValue] = useLocalStorage('wish_list', [])

  useEffect(() => {
    ;(async () =>
      await getSession().then((session) => {
        /* 
        when user reload page
        if user has change wishList
        we need to set new state to user.wishList
        as cleanup function does not work on page reload
        */
        ;(async () => await set(localStWishList))()
      }))()
  }, [])

  const [_, set] = useSyncWishList()

  //sync with localStorage and db on component unmount
  const wshlRef = useRef(wshl)
  wshlRef.current = wshl
  useEffect(() => {
    return () => {
      console.log(wshlRef.current)
      ;(async () => await set(wshlRef.current))()
    }
  }, [])

  //save to localStorage if user reloads page or closes page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setValue(wshlRef.current)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  async function like() {
    if (!wshl.includes(this._id)) {
      dispatch(wishList.add(this._id))
    } else {
      dispatch(wishList.remove(this._id))
    }
  }

  return [wshl, like]
}
