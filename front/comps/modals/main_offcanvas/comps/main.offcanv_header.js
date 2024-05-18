import Image from 'next/image'

import { pacifico } from 'pages/_app'

import s from './main.offcanv_header.module.scss'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// import {
//   toggle,
//   GLOBAL_COMPS,
// } from 'store/slices/global_comps/global_comps.slice.js'
// import { useDispatch } from 'react-redux'
// const { MAIN_OFFCANVAS } = GLOBAL_COMPS

export default function MainOffcanvasHeader() {
  // const dispatch = useDispatch()

  return (
    <AppBar position='static' className={`${s.header}`}>
      <Toolbar>
        <Image
          src={'/assets/logo.svg'}
          alt='Логотип магазину'
          width={30}
          height={30}
        />

        <Typography
          variant='h6'
          className={`${pacifico.className} ${s.shop_name}`}
        >
          Живий світ
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
