import axios from 'axios'
import { getSession, signIn as nextAuthSignIn } from 'next-auth/react'
import { useWishList } from 'hooks/useWishList.js'
import useSyncWishList from 'hooks/use_sync_wish_list'

//we need to set redux wishlist state to local storage wishlist state on every run
//when we sync we need to get redux state compare with session state and sync if needed
//why can't we read from localstorage on every run?

//todo place and reuse in useSignInHook
// async function onSuccessfulSignIn() {
//   //todo style display error message

//   const session = await getSession()

//   //sync wishList
//   sync(session)

//   //sync cart
//   // const cart = await getCart(session);
//   // dispatch(setCart(cart));
//   // toggleModal()
// }

function onError() {
  console.log('err')
}

function useSignIn() {
  const sync = useSyncWishList()
  // useSyncWishList(wishList, like)

  return async function signIn(email, password) {
    const res = await nextAuthSignIn('credentials', {
      email: email,
      password: password,
      // localStorageCartJson: localStorage.getItem('cart'),
      redirect: false,
    })

    if (res) {
      await sync()
    } else {
      onError()
    }

    return res
  }
}

export default useSignIn
