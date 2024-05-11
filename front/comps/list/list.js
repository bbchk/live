import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

import s from './list.module.scss'
import { balsamiqSans } from '#root/pages/_app.js'

const Item = ({ text, component, onClick, href, children }) => {
  return (
    <ListItem
      className={`${s.item}`}
      button
      component={component}
      href={href}
      onClick={onClick}
    >
      {children && (
        <ListItemIcon className={`${s.item_icon}`}>{children}</ListItemIcon>
      )}
      <ListItemText
        primaryTypographyProps={{
          className: `${balsamiqSans.className} ${s.item_text}`,
        }}
        primary={text}
      />
    </ListItem>
  )
}

const ItemButton = ({ text, onClick, children }) => {
  return (
    <Item text={text} component='button' onClick={onClick}>
      {children}
    </Item>
  )
}

const ItemLink = ({ text, href, children }) => {
  return (
    <Item text={text} component='a' href={href}>
      {children}
    </Item>
  )
}

const ListHeading = ({ text }) => {
  return (
    <Typography
      className={`${s.list_heading} ${balsamiqSans.className}`}
      variant='h6'
    >
      {text}
    </Typography>
  )
}

export { ItemButton, ItemLink, ListHeading }
