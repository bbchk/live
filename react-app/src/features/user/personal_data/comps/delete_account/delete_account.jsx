import s from './delete_account.module.scss'

import { useDispatch } from 'react-redux'
import { DeleteOutlineRounded } from '@mui/icons-material'

import Card from '../card'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { DELETE_ACCOUNT_MODAL } = GLOBAL_COMPS

const DeleteAccount = () => {
  const dispatch = useDispatch()

  const Header = () => (
    <div className={` ${s.header}`}>
      <DeleteOutlineRounded />
      <span>Видалити обліковий запис</span>
    </div>
  )

  const Body = () => (
    <div className={` ${s.body}`}>
      <p>
        Якщо ви видалите свій обліковий запис, повернути його назад неможливо.
        Будь ласка, будьте впевненими.
      </p>
      <button
        className='button_danger'
        onClick={() => {
          //todo delete account
          dispatch(toggle(DELETE_ACCOUNT_MODAL))
          // signOut({ callbackUrl: "/" });
        }}
      >
        Видалити акаунт
      </button>
    </div>
  )

  return <Card Header={Header} Body={Body} />
}

export default DeleteAccount
