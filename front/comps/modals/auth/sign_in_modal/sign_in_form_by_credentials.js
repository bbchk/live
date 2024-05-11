import { useState } from 'react'
import s from './sign_in_form_by_credentials.module.scss'
import modal_s from '../modal.module.scss'
import Link from 'next/link'
import InputField from 'comps/input_fields/input_field'
import PasswordInputField from 'comps/input_fields/password_input_field'

import useSignIn from 'hooks/useSignIn'

const SignInFormByCredentials = ({ toggleModal, toggleSignUpModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const signIn = useSignIn()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signIn(email, password).then((res) => {
      if (res) {
        toggleModal()
      }
    })
    //todo handle error
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${s.by_credentials} ${modal_s.left}`}
    >
      <div className={`${s.input_group}`}>
        <InputField
          type='email'
          id='signInEmailInputField'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label='Пошта'
        />
        <PasswordInputField
          id='signInPasswordInputField'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          label='Пароль'
        />
      </div>

      <Link
        className={`text-center d-block ${s.forgot_password_link} disabled`}
        href='#'
      >
        Забули пароль?
      </Link>

      <button type='submit' className={`button_primary `}>
        Увійти
      </button>

      <Link
        className={`text-center d-block ${s.sign_up_link}`}
        href='#'
        onClick={() => {
          toggleModal()
          toggleSignUpModal()
        }}
      >
        Зареєструватись
      </Link>
      {error ? <div className={``}>{error}</div> : <></>}
    </form>
  )
}

export default SignInFormByCredentials
