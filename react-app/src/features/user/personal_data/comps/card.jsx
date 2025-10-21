import s from './card.module.scss'

import { Card as MuiCard, CardContent } from '@mui/material'

import { balsamiqSans } from '#root/pages/_app.js'

const Card = ({ Header, Body }) => {
  return (
    <MuiCard className={`${s.card} `}>
      <header className={`${s.header} ${balsamiqSans.className}`}>
        <Header />
      </header>
      <CardContent className={`${s.body}`}>
        <Body />
      </CardContent>
    </MuiCard>
  )
}

export default Card
