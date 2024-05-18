import s from './change_password_modal.module.scss'
import ms from 'comps/modals/modal.module.scss'

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

import useChangePassword from 'features/user/hooks/useChangePasword.js'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const ChangePasswordModal = () => {
  const dispatch = useDispatch()
  const { changePasswordModalOpen } = useSelector((state) => state.modals)

  const [changePassword, _, error] = useChangePassword()

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
    console.log('submit')

    await changePassword({ ...passwordInfo })

    //todo
    // dispatch(toggle(CHANGE_PASSWORD_MODAL))
    setHasBeenBeingModified(false)
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={changePasswordModalOpen}
      onClose={() => dispatch(toggle(CHANGE_PASSWORD_MODAL))}
      fullWidth
      maxWidth='sm'
      fullScreen={fullScreen}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Змінити пароль
      </DialogTitle>
      <DialogContent className={`${s.body} ${balsamiqSans.className}`}>
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
          <DialogActions>
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
                >
                  Зберегти
                </button>
              </li>
            </menu>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal
