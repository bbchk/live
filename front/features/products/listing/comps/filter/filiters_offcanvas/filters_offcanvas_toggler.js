import s from './filters_offcanvas_toggler.module.scss'
import { useDispatch } from 'react-redux'
import { FilterAltRounded } from '@mui/icons-material'

import { toggle } from 'store/slices/global_comps/global_comps.slice'
import { GLOBAL_COMPS } from 'store/slices/global_comps/global_comps.slice'
const { FILTER_OFFCANVAS } = GLOBAL_COMPS

const FiltersOffcanvasToggler = ({ id }) => {
  const dispatch = useDispatch()

  return (
    <button
      className={` button_primary ${s.filters_offcanvas_toggler}`}
      type='button'
      onClick={() => dispatch(toggle(FILTER_OFFCANVAS))}
    >
      <p>Фільтри</p>
      <FilterAltRounded />
    </button>
  )
}

export default FiltersOffcanvasToggler
