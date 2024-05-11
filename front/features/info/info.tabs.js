import { List, Divider } from '@mui/material'

import {
  PrivacyTipRounded,
  GavelRounded,
  InfoRounded,
} from '@mui/icons-material'

import s from './info.tabs.module.scss'

import { ItemLink, ItemButton, ListHeading } from 'comps/list/list.js'

const UserListTabs = () => {
  return (
    <div className={`${s.tabs}`}>
      <List>
        <ItemLink text='Про нас' href='/info/about_us'>
          <InfoRounded />
        </ItemLink>

        <ItemLink text='Політика конфеденційності' href='/info/privacy-policy'>
          <PrivacyTipRounded />
        </ItemLink>

        <ItemLink text='Правила сайту' href='/info/terms-of-usage'>
          <GavelRounded />
        </ItemLink>
        <Divider />
      </List>
    </div>
  )
}

export default UserListTabs
