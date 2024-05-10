import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { SIGN_IN_MODAL } = GLOBAL_COMPS
import { useEffect } from 'react'

const SignIn = () => {
  const router = useRouter()

  const dispatch = useDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      dispatch(toggle(SIGN_IN_MODAL))
    } else {
      router.push('/profile/personal_data')
    }
    // eslint-disable-next-line
  }, [session, dispatch])

  const { signInModalOpen, signUpModalOpen } = useSelector(
    (state) => state.modals,
  )

  useEffect(() => {
    let timeoutId
    if (!signInModalOpen && !signUpModalOpen) {
      timeoutId = setTimeout(() => {
        router.push('/')
      }, 200)
    }
    return () => {
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line
  }, [signInModalOpen, signUpModalOpen])

  return <></>
}

export default SignIn
