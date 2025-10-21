import s from './delete_account_modal.module.scss'
import ms from 'comps/modals/modal.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { DELETE_ACCOUNT_MODAL } = GLOBAL_COMPS

import { balsamiqSans } from 'pages/_app'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const DeleteAccountModal = () => {
  const dispatch = useDispatch()
  const { deleteAccountModalOpen } = useSelector((state) => state.modals)

  const handleDelete = async (e) => {
    e.preventDefault()
    //todo implement delete account logic
  }

  const toggleModal = () => dispatch(toggle(DELETE_ACCOUNT_MODAL))

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={deleteAccountModalOpen}
      onClose={() => dispatch(toggle(DELETE_ACCOUNT_MODAL))}
      fullWidth
      maxWidth='sm'
      fullScreen={fullScreen}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Видалити акаунт ?
      </DialogTitle>
      <DialogContent className={`${s.body} ${balsamiqSans.className}`}>
        <menu className={`${s.button_group}`}>
          <li>
            <button className='button_primary' onClick={toggleModal}>
              Скасувати
            </button>
          </li>
          <li>
            <button
              className='button_danger'
              onClick={(e) => {
                toggleModal()
                handleDelete(e)
              }}
            >
              Видалити акаунт
            </button>
          </li>
        </menu>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountModal
