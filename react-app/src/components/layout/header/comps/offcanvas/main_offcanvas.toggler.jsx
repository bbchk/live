import s from './main_offcanvas.toggler.module.scss'
import hs from '../../header.module.scss'

import { useDispatch } from 'react-redux'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { MAIN_OFFCANVAS } = GLOBAL_COMPS

import {
  MenuRounded,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material'

const OffcanvasToggler = () => {
  const dispatch = useDispatch()
  return (
    <div className={`${s.offcanvas_toggler} ${hs.offcanvas_toggler}`}>
      <button
        onClick={() => dispatch(toggle(MAIN_OFFCANVAS))}
        aria-label='Меню'
        aria-description='Відкрити бокову панель меню'
      >
        <MenuRounded fontSize='large' />
      </button>
    </div>
  )
}

export default OffcanvasToggler
