import { useState } from 'react'
import { setCookie } from 'nookies'
import { useDispatch } from 'react-redux'
import { signIn as sign_in } from 'store/slices/user.slice'
import axios from 'axios'

export const useSignIn = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const dispatch = useDispatch()

  const signIn = async (email, password) => {
    setIsLoading(true)
    setError(false)

    try {
      const response = await axios.post(
        `/user/signIn`,
        { email, password },
        { headers: { 'Content-type': 'application/json' } },
      )

      const json = response.data
      localStorage.setItem('user', JSON.stringify(json))
      dispatch(sign_in(json))
      setCookie(null, 'auth-token', json.token, {
        path: '/',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60, // expires in 3 days
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.response.data.error)
    }
  }

  return { signIn, isLoading, error }
}
