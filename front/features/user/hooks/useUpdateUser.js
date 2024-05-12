import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const useUpdateUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { data: session, update } = useSession()

  const updateUser = async (userInfo) => {
    setIsLoading(true)
    setError(false)

    try {
      const response = await axios.patch(
        `/user/personal-info/${session.user.id}`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        },
      )
      const { message, statusCode } = response.data
      console.log('🚀 ~ message:', message)
      console.log('🚀 ~ statusCode:', statusCode)

      const requestSuccessful = response.status >= 200 && response.status < 300

      if (requestSuccessful) {
        await update({
          ...session,
          user: {
            ...session?.user,
            ...userInfo,
          },
        })
      } else {
        setError(data.message)
      }
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return [updateUser, isLoading, error]
}

export default useUpdateUser
