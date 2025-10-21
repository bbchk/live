import { useState } from 'react'
import s from './sign_in_form_by_credentials.module.scss'

import Link from 'next/link'
import InputField from 'comps/input_fields/input_field'
import PasswordInputField from 'comps/input_fields/password_input_field'
import Alert from 'comps/warnings/alert'

import useSignIn from 'features/user/hooks/useSignIn.js'

const SignInFormByCredentials = ({ toggleModal, toggleSignUpModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, status, error] = useSignIn()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signIn(email, password).then((res) => {
      if (res.ok) {
        setTimeout(() => {
          toggleModal()
        }, 1000)
      }
    })
    //todo handle error
  }

  return (
    <form onSubmit={handleSubmit} className={`${s.by_credentials}`}>
      {error && <Alert text={error} severity={'error'} />}
      {status === 'success' && (
        <Alert text={'Ви успішно авторизовані!'} severity={'success'} />
      )}
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
    </form>
  )
}

export default SignInFormByCredentials
