import { signIn as nextAuthSignIn } from 'next-auth/react'
import useSyncWishList from 'hooks/use_sync_wish_list'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { useState } from 'react'

function useSignIn() {
  const sync = useSyncWishList()
  const [wshl, _] = useLocalStorage('wish_list', [])
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
