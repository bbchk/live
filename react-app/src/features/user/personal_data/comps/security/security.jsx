import s from './security.module.scss'

import Card from '../card'

import { LockRounded } from '@mui/icons-material'

import { useDispatch } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CHANGE_PASSWORD_MODAL } = GLOBAL_COMPS

import { useSession, signIn, signOut } from '../../contexts/AuthContext'

const Security = () => {
  const dispatch = useDispatch()

  const Header = () => (
    <div className={` ${s.header}`}>
      <LockRounded />
      <span>Безпека</span>
    </div>
  )

  const Body = () => (
    <div className={` ${s.body}`}>
      <button onClick={() => dispatch(toggle(CHANGE_PASSWORD_MODAL))}>
        Змінити пароль?
      </button>
      <button
        onClick={() => {
          signOut({ callbackUrl: '/' }).then(() => {
            window.location.href = '/'
          })
        }}
      >
        Вийти з акаунту
      </button>
    </div>
  )

  return <Card Header={Header} Body={Body} />
}

export default Security
