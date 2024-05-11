import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from './useLocalStorage'
import { useEffect } from 'react'

//? todo use redux?
export const useWishList = () => {
  //   const dispatch = useDispatch()
  //   const status = useSelector((state) => state.wishList.status)
  //   useEffect(() => {
  //     if (status !== 'idle') {
  //       dispatch(set(wishList))
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [dispatch])
  const { data: session } = useSession()

  const authHeader = session && {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
  }

  // useEffect(() => {
  //   //todo dispatch to wishlist slice
  // }, [wishList])

  const [wishList, setValue] = useLocalStorage('wish_list', [])

  // todo can't be in many compoponents
  useEffect(() => {
    if (session) {
      console.log('🚀 ~ session:', session)
      const isWishListDifferent =
        JSON.stringify(session.user.wishList) !== JSON.stringify(wishList)

      console.log(isWishListDifferent)

      if (isWishListDifferent) {
        ;(async () => {
          try {
            const response = await axios.patch(
              `/user/wish-list/${session.user.id}/sync`,
              wishList,
              authHeader,
            )
            console.log(response.data)
            setValue(response.data)
          } catch (e) {
            //todo dispatch error to wishlist slice and display alert to the user
            //todo log
          }
        })()
      }
    }
    // eslint-disable-next-line
  }, [session])

  useEffect(() => {
    return () => {
      //sync wish list state with the server
    }
  }, []) // Em

  const addToWishList = async (productId) => {
    if (session) {
      try {
        await axios.post(
          `/user/wish-list/${session.user.id}/add/${productId}`,
          undefined,
          authHeader,
        )
      } catch (e) {
        //todo dispatch error to wishlist slice and display alert to the user
        //todo log
      }
    }
    setValue([...wishList, productId])
  }

  const removeFromWishList = async (productId) => {
    if (session) {
      try {
        await axios.delete(
          `/user/wish-list/${session.user.id}/delete/${productId}`,
          authHeader,
        )
      } catch (e) {
        //todo dispatch error to wishlist slice and display alert to the user
        //todo log
      }
    }
    setValue(wishList.filter((id) => id !== productId))
  }

  async function like() {
    console.log(wishList)
    if (!wishList.includes(this._id)) {
      await addToWishList(this._id)
    } else {
      await removeFromWishList(this._id)
    }
  }

  return [wishList, like]
}
