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

  const [wishList, setValue] = useLocalStorage('wish_list', [])

  async function like() {
    if (this.isLiked) {
      setValue(wishList.filter((id) => id !== this._id))
      if (session) {
        await axios.delete(
          `/user/wish-list/${session.user.id}/delete/${this._id}`,
          authHeader,
        )
      }
    } else {
      setValue([...wishList, this._id])
      if (session) {
        await axios.post(
          `/user/wish-list/${session.user.id}/add/${this._id}`,
          undefined,
          authHeader,
        )
      }
    }
    this.isLiked = !this.isLiked
  }

  //   async function add(product) {
  //     try {
  //       if (session) {
  //         const response = await axios.post(
  //           `/user/wish-list/${session.user.id}/add/${_id}`,
  //           undefined,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${session.user.token}`,
  //             },
  //           },
  //         )
  //       }
  //     } catch (e) {
  //       // console.log(e);
  //     }
  //   }

  function dislike() {
    if (this.isLiked) {
      setValue(wishList.filter((id) => id !== this._id))
      //   dispatch(remove(this._id))
    } else {
      setValue([...wishList, this._id])
      //   dispatch(add(this._id))
    }
    this.isLiked = !this.isLiked
  }

  return [wishList, like]

  //   async function add(product) {
  //     try {
  //       if (session) {
  //         const response = await axios.post(
  //           `/user/cart/${session.user.id}/add/${_id}`,
  //           undefined,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${session.user.token}`,
  //             },
  //           },
  //         )
  //       }
  //     } catch (e) {
  //       // console.log(e);
  //     }
  //   }

  //   async function remove(productId) {
  //     try {
  //       let cart = JSON.parse(localStorage.getItem('cart')) || []
  //       let cartItem = cart.find((item) => item.product._id === productId)

  //       if (cartItem && cartItem.quantity > 1) {
  //         cartItem.quantity--
  //       } else if (cartItem) {
  //         cart = cart.filter((item) => item.product._id !== productId)
  //       }

  //       localStorage.setItem('cart', JSON.stringify(cart))
  //       dispatch(deleteCartItem(productId))

  //       if (session) {
  //         const response = await axios.delete(
  //           `/user/cart/${session.user.id}/delete/${productId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${session.user.token}`,
  //             },
  //           },
  //         )
  //       }
  //     } catch (e) {
  //       // console.log(e);
  //     }
  //   }

  //todo
  //   async function removeAll(productId) {}

  //   async function getWishList(session) {
  //     try {
  //       const localStorageCartJson = localStorage.getItem('cart')
  //       const lscart = JSON.parse(localStorageCartJson) || []

  //       let cart = []

  //       //if local storage cart is not empty, sync it with user cart on sign in
  //       if (session) {
  //         if (lscart.length > 0) {
  //           const syncedCart = await syncAndFetch(session.user, lscart)
  //           localStorage.setItem('cart', JSON.stringify(syncedCart))
  //           cart = syncedCart
  //         } else {
  //           cart = await fetchCart(session.user)
  //         }
  //       } else {
  //         cart = lscart
  //       }

  //       return cart
  //     } catch (e) {
  //       // console.log(e);
  //     }
  //   }

  //   const res = await axios.patch(
  //     `/user/cart/${user.id}/sync`,
  //     localStorageCartOptimized,
  //     {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     },
  //   )

  //   async function fetch(user) {
  //     try {
  //       const res = await axios.get(`/user/cart/${user.id}/fetch`, {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       })

  //       return res.data
  //     } catch (e) {
  //       // console.log(e);
  //     }
  //   }

  //todo
  //   return { add, remove, getCart }
}
