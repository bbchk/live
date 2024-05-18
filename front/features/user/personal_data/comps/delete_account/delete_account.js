import s from './delete_account.module.scss'
import cs from './../card.module.scss'

import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardContent, Button } from '@mui/material'
import { DeleteOutlineRounded } from '@mui/icons-material'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { DELETE_ACCOUNT_MODAL } = GLOBAL_COMPS
import { balsamiqSans } from '#root/pages/_app.js'

const DeleteAccount = () => {
  const dispatch = useDispatch()

  return (
    <Card className={`${s.card} ${cs.card} `}>
      <header className={`${s.header} ${cs.header} ${balsamiqSans.className}`}>
        <DeleteOutlineRounded />
        <span>Видалити обліковий запис</span>
      </header>
      <CardContent className={`${s.body} ${cs.body}`}>
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
      </CardContent>
    </Card>
  )
}

export default DeleteAccount
