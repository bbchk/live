import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useUpdateUser from './useUpdateUser'

const useChangePassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { data: session, update } = useSession()

  const [updateUser, _, err] = useUpdateUser()

  useEffect(() => {
    setError(err)
  }, [err])

  const changePassword = async ({
    oldPassword,
    newPassword,
    newPasswordRepeat,
  }) => {
    setIsLoading(true)
    setError(false)

    if (newPassword !== newPasswordRepeat) {
      setError('Паролі не співпадають')
      setIsLoading(false)
      return
    }

    await updateUser({
      oldPassword: oldPassword,
      password: newPassword,
    })

    setIsLoading(false)
  }

  return [changePassword, isLoading, error]
}

export default useChangePassword
