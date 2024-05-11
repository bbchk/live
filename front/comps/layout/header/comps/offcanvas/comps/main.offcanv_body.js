import s from './main.offcanv_body.module.scss'

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  AccountCircle,
  Favorite,
  Interests,
  ReceiptLong,
  ShoppingCart,
  MeetingRoom,
} from '@mui/icons-material'
import { balsamiqSans } from '#root/pages/_app.js'

import { signOut, useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

import { ItemLink, ItemButton, ListHeading } from 'comps/list/list.js'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { SIGN_IN_MODAL, CART_MODAL, MAIN_OFFCANVAS } = GLOBAL_COMPS

function MainOffcanvasBody() {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className={`${balsamiqSans.className}`}>
      <List>
        {session ? (
          <>
            <List>
              <ItemLink text='Особистий кабінет' href={`/user/personal_data`}>
                <Image
                  className={`${s.user_avatar}`}
                  src={user.image}
                  width={50}
                  height={50}
                  sizes='5vw'
                  alt='користувача'
                />
              </ItemLink>
            </List>
            <Divider />
            <ItemLink text='Усі категорії товарів' href='/'>
              <Interests />
            </ItemLink>
            <ItemLink text='Список бажань' href='/user/wish_list'>
              <Favorite />
            </ItemLink>
            <ItemLink text='Мої замовлення' href='/user/orders_list'>
              <ReceiptLong />
            </ItemLink>
          </>
        ) : (
          <>
            <List>
              <ItemButton
                text='Увійти в акаунт'
                onClick={() => {
                  dispatch(toggle(MAIN_OFFCANVAS))
                  dispatch(toggle(SIGN_IN_MODAL))
                }}
              >
                <AccountCircle />
              </ItemButton>
            </List>
            <Divider />
            <ItemLink text='Усі категорії товарів' href='/'>
              <Interests />
            </ItemLink>
          </>
        )}
        <ItemButton
          text='Кошик покупок'
          component='button'
          onClick={() => {
            dispatch(toggle(MAIN_OFFCANVAS))
            dispatch(toggle(CART_MODAL))
          }}
        >
          <ShoppingCart />
        </ItemButton>
      </List>
      <Divider />

      <List className={`${s.dotted_list}`}>
        <ListHeading text='Інформація про магазин' />
        <ItemLink text='Про нас' href='/info/abouts' />
        <ItemLink text='Політика приватності' href='/info/privacy-policy' />
        <ItemLink text='Умови використання сайту' href='/info/terms-of-usage' />
      </List>

      {session && (
        <>
          <Divider />
          <List>
            <ItemButton
              text='Вийти з акаунту'
              onClick={() => {
                dispatch(toggle(MAIN_OFFCANVAS))
                signOut({ callbackUrl: '/' }).then(() => {
                  window.location.href = '/'
                })
              }}
            >
              <MeetingRoom />
            </ItemButton>
          </List>
        </>
      )}
    </div>
  )
}

export default MainOffcanvasBody
