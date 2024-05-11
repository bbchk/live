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

import s from './info.tabs.module.scss'

import { ItemLink, ItemButton, ListHeading } from 'comps/list/list.js'

const UserListTabs = () => {
  return (
    <div className={`${s.tabs}`}>
      <List>
        <ItemLink text='Про нас' href='/info/about_us'>
          <AccountCircle />
        </ItemLink>

        <ItemLink text='Політика конфеденційності' href='/info/privacy-policy'>
          <Interests />
        </ItemLink>
        <ItemLink text='Правила сайту' href='/info/terms-of-usage'>
          <Favorite />
        </ItemLink>
        <Divider />
      </List>
    </div>
  )
}

export default UserListTabs
