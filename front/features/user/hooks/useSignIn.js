import axios from 'axios'
import { signIn as nextAuthSignIn } from 'next-auth/react'
import useSyncWishList from 'hooks/use_sync_wish_list'
import useLocalStorage from '../../../hooks/useLocalStorage'

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
  const [wshl, _] = useLocalStorage('wish_list', [])

  return async function signIn(email, password) {
    const res = await nextAuthSignIn('credentials', {
      email: email,
      password: password,
      // localStorageCartJson: localStorage.getItem('cart'),
      redirect: false,
    })

    if (res) {
      //?what if we sign in on page, until unmount and not synced??
      await sync(wshl)
    } else {
      onError()
    }

    return res
  }
}

export default useSignIn
