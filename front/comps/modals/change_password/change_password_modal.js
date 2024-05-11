// import { useState } from "react";
import { Modal } from 'react-bootstrap'
import s from './change_password_modal.module.scss'

// import Link from "next/link";
import Alert from 'comps/warnings/alert'

import { useDispatch, useSelector } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CHANGE_PASSWORD_MODAL } = GLOBAL_COMPS

import PasswordInputField from 'comps/input_fields/password_input_field'
import { useEffect, useState } from 'react'
import { balsamiqSans } from 'pages/_app'
import useTabTrap from 'comps/accessibility/hooks/useTabbingTrap.js'
import useChangePassword from 'features/user/hooks/useChangePasword.js'

//todo input validation
//todo make modal responsive
//todo make it really change password
const ChangePasswordModal = () => {
  const dispatch = useDispatch()
  const { changePasswordModalOpen } = useSelector((state) => state.modals)

  const [changePassword, _, error] = useChangePassword()

  useTabTrap(changePasswordModalOpen, 'changePasswordModal')

  const [hasBeenBeingModified, setHasBeenBeingModified] = useState(false)

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  })

  useEffect(() => {
    return () => {
      setPasswordInfo({
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
      })
      setHasBeenBeingModified(false)
    }
  }, [changePasswordModalOpen])

  const handleSubmit = async (e, value) => {
    e.preventDefault()

    await changePassword({ ...passwordInfo })
  }

  return (
    <Modal
      id='changePasswordModal'
      show={changePasswordModalOpen}
      onHide={() => dispatch(toggle(CHANGE_PASSWORD_MODAL))}
      centered
      className={`${s.modal} ${balsamiqSans.className}`}
    >
      <Modal.Header closeButton={true} className={`${s.modal_header}`}>
        <h3>Змінити пароль</h3>
      </Modal.Header>
      <Modal.Body className={`${s.modal_body}`}>
        <form onSubmit={handleSubmit}>
          <div className={`${s.input_group}`}>
            <PasswordInputField
              id='oldPasswordInputField'
              value={passwordInfo.oldPassword}
              onChange={(e) => {
                setHasBeenBeingModified(true)
                setPasswordInfo({
                  ...passwordInfo,
                  oldPassword: e.target.value,
                })
              }}
              label='Ваш старий пароль'
            />
            <PasswordInputField
              id='newPasswordInputField'
              value={passwordInfo.newPassword}
              onChange={(e) => {
                setHasBeenBeingModified(true)
                setPasswordInfo({
                  ...passwordInfo,
                  newPassword: e.target.value,
                })
              }}
              label='Новий пароль'
            />
            <PasswordInputField
              id='newPasswordRepeatInputField'
              value={passwordInfo.newPasswordRepeat}
              onChange={(e) => {
                setHasBeenBeingModified(true)
                setPasswordInfo({
                  ...passwordInfo,
                  newPasswordRepeat: e.target.value,
                })
              }}
              label='Новий пароль ще раз'
            />
          </div>
          {error && <Alert text={error} severity={'error'} animated={false} />}
          <menu className={`${s.button_group}`}>
            <li>
              <button
                className='button_primary'
                type='button'
                onClick={() => {
                  setHasBeenBeingModified(false)
                  dispatch(toggle(CHANGE_PASSWORD_MODAL))
                }}
              >
                Скасувати
              </button>
            </li>
            <li>
              <button
                className='button_submit'
                data-toggle='tooltip'
                title={hasBeenBeingModified ? '' : 'Дані не були змінені'}
                data-placement='bottom'
                type='submit'
                disabled={!hasBeenBeingModified}
                onClick={() => {
                  setHasBeenBeingModified(false)
                  dispatch(toggle(CHANGE_PASSWORD_MODAL))
                }}
              >
                Зберегти
              </button>
            </li>
          </menu>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ChangePasswordModal
