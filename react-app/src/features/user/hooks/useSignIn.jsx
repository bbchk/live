import { signIn as nextAuthSignIn } from 'next-auth/react'
import useSyncWishList from 'hooks/use_sync_wish_list'
import useManageCart from 'hooks/use_manage_cart'

import useLocalStorage from 'hooks/useLocalStorage'
import { useState } from 'react'

function useSignIn() {
  const [sync] = useSyncWishList()
  const [sync_] = useManageCart()

  const [wshl] = useLocalStorage('wish_list', [])
  const [cart] = useLocalStorage('cart', [])

  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  async function signIn(email, password) {
    const res = await nextAuthSignIn('credentials', {
      email: email,
      password: password,
      // localStorageCartJson: localStorage.getItem('cart'),
      redirect: false,
    })

    if (res.ok) {
      await sync(wshl) //?what if we sign in on page, until unmount and not synced??
      console.log('🚀 ~ cart:', cart)
      await sync_(cart) //?what if we sign in on page, until unmount and not synced??

      setStatus('success')
    } else {
      console.log(res)
      setStatus('fail')
      setError(res.error)
    }

    return res
  }

  return [signIn, status, error]
}

export default useSignIn

//todo useOnLogOut -> crear up cart and wishList
