import s from './security.module.scss'
import card_s from './../card.module.scss'
import { Card } from 'react-bootstrap'

import { LockRounded } from '@mui/icons-material'

import { useDispatch } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CHANGE_PASSWORD_MODAL } = GLOBAL_COMPS

import { signOut } from 'next-auth/react'

const Security = () => {
  const dispatch = useDispatch()
  return (
    <Card className={`${card_s.card}`}>
      <Card.Header className={`${card_s.header}`}>
        <LockRounded />
        <h5>Безпека</h5>
      </Card.Header>
      <Card.Body className={`${card_s.body} ${s.security}`}>
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
      </Card.Body>
    </Card>
  )
}

export default Security
