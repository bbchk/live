import { useRef, useState } from 'react'
import Link from 'next/link'
import Popover from '@mui/material/Popover'
import { useDispatch } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { SIGN_IN_MODAL, SIGN_UP_MODAL } = GLOBAL_COMPS

import { balsamiqSans } from 'pages/_app'

import s from './auth_popover.module.scss'

import { AccountCircleRounded } from '@mui/icons-material'

const AuthPopover = () => {
  const anchorRef = useRef(null)
  const lastFocusedElement = useRef(null)
  const signInButton = useRef(null)

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    lastFocusedElement.current = document.activeElement
    setOpen(true)
    setTimeout(() => {
      signInButton.current &&
        signInButton.current.focus({ preventScroll: true })
    }, 0)
  }

  const handleClose = () => {
    setOpen(false)
    lastFocusedElement.current && lastFocusedElement.current.focus()
  }

  return (
    <li className={`${s.account_nav_btn}`} aria-label={'Персональний кабінет'}>
      <button
        ref={anchorRef}
        className={`${s.popover_button}`}
        onClick={handleOpen}
        aria-label={'Увійти або зареєструватись'}
      >
        <AccountCircleRounded
          className={`${s.profile_icon}`}
          onMouseEnter={handleOpen}
        />
      </button>
      <Popover
        className={`${s.popover} ${balsamiqSans.className}`}
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: s.popover }}
      >
        <button
          ref={signInButton}
          className={` ${s.sign_in_button} button_submit primary_button`}
          onClick={() => {
            setOpen(false)
            dispatch(toggle(SIGN_IN_MODAL))
          }}
          aria-label='Відкрити вікно авторизації'
        >
          Увійти
        </button>

        <span>Не зареєстровані? </span>
        <Link
          aria-label='Відкрити вікно реєстрації'
          href='/'
          onClick={() => {
            setOpen(false)
            dispatch(toggle(SIGN_UP_MODAL))
          }}
          className={`${s.sign_up_link} icon-link link_secondary`}
        >
          Зареєструватись
        </Link>
      </Popover>
    </li>
  )
}

export default AuthPopover
