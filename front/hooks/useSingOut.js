// import { useRouter } from 'next/router'
// import { destroyCookie } from 'nookies'
// import { useDispatch } from 'react-redux'
// import { signOut as sign_out } from 'store/slices/user.slice'

// export const useSignOut = () => {
//   const dispatch = useDispatch()
//   const router = useRouter()

//   const signOut = async () => {
//     localStorage.removeItem('user')
//     dispatch(sign_out())

//     await destroyCookie(null, 'auth-token', {
//       path: '/',
//       sameSite: 'strict',
//       maxAge: 0,
//     })
//     router.push('/')
//   }

//   return { signOut }
// }

//todo when log out wishlist purge from localStorage and cart
