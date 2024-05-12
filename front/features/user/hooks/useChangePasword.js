import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useUpdateUser from './useUpdateUser'

const useChangePassword = () => {
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  const [updateUser, _, err] = useUpdateUser()

  useEffect(() => {
    setError(err)
  }, [err])

  const changePassword = async ({
    oldPassword,
    newPassword,
    newPasswordRepeat,
  }) => {
    setStatus('loading')
    setError(null)

    const result = (() => {
      if (!newPassword.length) {
        return 'Новий пароль не може бути відсутній'
      }

      if (!oldPassword.length) {
        return 'Старий пароль не може бути відсутній'
      }

      if (newPassword !== newPasswordRepeat) {
        return 'Паролі не співпадають'
      }

      if (newPassword === oldPassword) {
        return 'Ваш новий пароль не може бути таким самим, як старий'
      }

      return null
    })()
    setError(result)
    setStatus(result ? 'loading' : 'fail')

    await updateUser({
      oldPassword: oldPassword,
      password: newPassword,
    })

    setStatus('success')
  }

  return [changePassword, status, error]
}

export default useChangePassword
