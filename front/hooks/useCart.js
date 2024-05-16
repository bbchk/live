// import axios from 'axios'
// import { useSession } from 'next-auth/react'
// import { useDispatch } from 'react-redux'
// import { addToCart, deleteCartItem } from 'store/slices/user.slice'
// export const useCart = () => {
//   const { data: session, update } = useSession()
//   const dispatch = useDispatch()

//   async function add(product) {
//     console.log(product)
//     const { _id, name, price, images, left } = product
//     const cartItem = { _id, name, price, images, left }

//     try {
//       let cart = JSON.parse(localStorage.getItem('cart')) || []
//       let existingCartItem = cart.find(
//         (item) => item.product._id == cartItem._id,
//       )

//       if (existingCartItem) {
//         existingCartItem.quantity++
//       } else {
//         cart.push({
//           product: cartItem,
//           quantity: 1,
//         })
//       }

//       localStorage.setItem('cart', JSON.stringify(cart))
//       dispatch(
//         addToCart({
//           product: cartItem,
//           quantity: 1,
//         }),
//       )

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

//   //todo
//   async function removeAll(productId) {}

//   async function getCart(session) {
//     console.log('🚀 ~ session:', session)
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

//   async function syncAndFetch(user, lscart) {
//     try {
//       const localStorageCartOptimized = lscart.map((item) => {
//         return { product: item.product._id, quantity: item.quantity }
//       })

//       const res = await axios.patch(
//         `/user/cart/${user.id}/sync`,
//         localStorageCartOptimized,
//         {
//           headers: {
//             'Content-type': 'application/json',
//             Authorization: `Bearer ${user.token}`,
//           },
//         },
//       )

//       return res.data
//     } catch (e) {
//       // console.log(e);
//     }
//   }

//   async function fetchCart(user) {
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

//   // return { add, subtract, remove, sync };
//   return { add, remove, getCart }
// }
