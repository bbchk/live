import s from './main_offcanvas.module.scss'
import hs from '../../header.module.scss'

import MainOffcanvasHeader from './comps/main.offcanv_header'
import MainOffcanvasBody from './comps/main.offcanv_body'

import { useDispatch, useSelector } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { MAIN_OFFCANVAS } = GLOBAL_COMPS

import { SwipeableDrawer, Box, Divider } from '@mui/material'
import {
  MenuRounded,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material'

export const MainOffcanvas = () => {
  const dispatch = useDispatch()
  const { mainOffcanvasOpen } = useSelector((state) => state.modals)

  function handleToggle() {
    dispatch(toggle(MAIN_OFFCANVAS))
  }

  return (
    <SwipeableDrawer
      open={mainOffcanvasOpen}
      onOpen={handleToggle}
      onClose={handleToggle}
      transitionDuration={{ appear: 250, enter: 250, exit: 250 }}
    >
      <Box sx={{ width: 350 }} role='presentation'>
        <MainOffcanvasHeader />
        <Divider />
        <MainOffcanvasBody />
      </Box>
    </SwipeableDrawer>
  )
}

export const OffcanvasToggler = () => {
  const dispatch = useDispatch()
  return (
    <div className={`${s.offcanvas_toggler} ${hs.offcanvas_toggler}`}>
      <button
        onClick={() => dispatch(toggle(MAIN_OFFCANVAS))}
        aria-label='Меню'
      >
        <MenuRounded fontSize='large' />
      </button>
    </div>
  )
}
