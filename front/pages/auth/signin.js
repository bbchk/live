import { useEffect, useState } from 'react'

import VerticalSplitter from 'comps/modals/auth/vertical_splitter.js'

import SignInFormByCredentials from 'comps/modals/auth/sign_in_modal/sign_in_form_by_credentials.js'
import SignUpFormByCredentials from 'comps/modals/auth/sign_up_modal/sign_up_form_by_credentials.js'
import SignFormByServices from 'comps/modals/auth/sign_form_by_services.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignIn = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push('/user/personal_data')
    }
  }, [router, session])

  const [modal, setModal] = useState(true)

  const toggleAlternative = () => {
    setModal(!modal)
  }

  return (
    <div
      style={{
        margin: '2rem 20rem',
        border: '1px solid #2f4858',
        padding: '1rem',
        'border-radius': '10px',
      }}
    >
      {modal ? (
        <SignInFormByCredentials
          toggleModal={() => {}}
          toggleSignUpModal={toggleAlternative}
        />
      ) : (
        <SignUpFormByCredentials
          toggleModal={() => {}}
          toggleSignInModal={toggleAlternative}
        />
      )}

      <VerticalSplitter />

      <SignFormByServices />
    </div>
  )
}

export default SignIn
