import { useSession, signIn, signOut } from '../../contexts/AuthContext'
import Image from 'next/image'

import { useDispatch } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { CART_MODAL } = GLOBAL_COMPS

import hs from '../../header.module.scss'

import IconButton from './icon_button'
import AuthPopover from './auth_popover'
import s from './button_group.module.scss'

import {
  ChecklistRtlRounded,
  FavoriteBorderRounded,
  ShoppingCartRounded,
} from '@mui/icons-material'

//todo list of links with unordered list
const ButtonGroup = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()

  return (
    <nav className={` ${s.auth_btn_group} ${hs.icon_btn_group}`}>
      <ul>
        {session ? (
          session.user.image && (
            <IconButton
              href={'/user/personal_data'}
              tooltipText={'Персональний кабінет'}
              ariaDescribedby='Перейти до персонального кабінету'
            >
              <Image
                src={session.user.image}
                alt='Profile'
                width={50}
                height={50}
              />
            </IconButton>
          )
        ) : (
          <AuthPopover />
        )}

        {session && (
          <>
            <IconButton
              href={'/user/orders_list'}
              tooltipText={'Список замовлень'}
              ariaDescribedby='Перейти до списку замовлень в особистому кабінеті'
            >
              <ChecklistRtlRounded />
            </IconButton>
            <IconButton
              href={'/user/wish_list'}
              tooltipText={'Список бажаного'}
              ariaDescribedby='Перейти до списку бажаного в особистому кабінеті'
            >
              <FavoriteBorderRounded />
            </IconButton>
          </>
        )}

        <IconButton
          tooltipText={'Кошик покупок'}
          ariaDescribedby='Відкрити вікно кошику'
          onClick={() => dispatch(toggle(CART_MODAL))}
        >
          <ShoppingCartRounded />
        </IconButton>
      </ul>
    </nav>
  )
}

export default ButtonGroup
