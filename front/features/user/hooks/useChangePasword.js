import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useUpdateUser from './useUpdateUser'

const useChangePassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

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

    if (newPassword.length === 0) {
      setError('Новий пароль не може бути відсутній')
      setIsLoading(false)
      return
    }

    if (oldPassword.length === 0) {
      setError('Старий пароль не може бути відсутній')
      setIsLoading(false)
      return
    }

    if (newPassword !== newPasswordRepeat) {
      setError('Паролі не співпадають')
      setIsLoading(false)
      return
    }

    if (newPassword === oldPassword) {
      setError('Ваш новий пароль не може бути таким самим, як старий')
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
