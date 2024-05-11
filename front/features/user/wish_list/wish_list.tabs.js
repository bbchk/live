import { List, Divider } from '@mui/material'

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

import s from './wish_list.tabs.module.scss'

import { ItemLink, ItemButton, ListHeading } from 'comps/list/list.js'
import ProfileTab from '#root/features/profile/comps/tabs/profile-tab.js'

const UserListTabs = () => {
  return (
    <div className={`${s.tabs}`}>
      <List>
        <ProfileTab />
        <ItemLink text='Особистий кабінет' href='/profile/personal_data'>
          <AccountCircle />
        </ItemLink>

        <ItemLink text='Усі категорії товарів' href='/'>
          <Interests />
        </ItemLink>
        <ItemLink text='Список бажань' href='/user/wish_list'>
          <Favorite />
        </ItemLink>
        <ItemLink text='Мої замовлення' href='/profile/orders_list'>
          <ReceiptLong />
        </ItemLink>
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
      </List>
    </div>
  )
}

export default UserListTabs
