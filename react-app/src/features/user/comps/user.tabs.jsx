import { List, Divider } from '@mui/material'

import {
  Menu,
  Home,
  AccountCircle,
  Favorite,
  Interests,
  ReceiptLong,
  ShoppingCart,
  MeetingRoom,
} from '@mui/icons-material'

import s from './user.tabs.module.scss'

import { ItemLink, ItemButton, ListHeading } from 'comps/list/list.js'

import { useSession, signIn, signOut } from '../../contexts/AuthContext'

import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { toggle } from 'store/slices/global_comps/global_comps.slice'
import { GLOBAL_COMPS } from 'store/slices/global_comps/global_comps.slice'
const { MAIN_OFFCANVAS } = GLOBAL_COMPS

const UserListTabs = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const user = session?.user
  return (
    <div className={`${s.tabs}`}>
      <List>
        {session && (
          <ItemLink text='Особистий кабінет' href='/user/personal_data'>
            {/* <AccountCircle /> */}
            <div className={`${s.image}`}>
              {user && user.image && (
                <Image
                  src={user.image}
                  width={50}
                  height={50}
                  sizes='100vw'
                  alt='user'
                />
              )}
            </div>
          </ItemLink>
        )}

        <ItemLink text='Список бажань' href='/user/wish_list'>
          <Favorite />
        </ItemLink>
        {session && (
          <ItemLink text='Мої замовлення' href='/user/orders_list'>
            <ReceiptLong />
          </ItemLink>
        )}

        {session && (
          <>
            <Divider />
            <List>
              <ItemLink text='На головну сторінку' href='/'>
                <Home />
              </ItemLink>
              <ItemButton
                text='Вийти з акаунтa'
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
      </List>
    </div>
  )
}

export default UserListTabs
