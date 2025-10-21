import s from './selected.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllFilters } from 'store/slices/filters.slice'
import { useNavigate, useLocation } from 'react-router-dom'
import { startLoading } from 'store/slices/global_comps/global_comps.slice.js'

const Selected = ({ productsCount }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { filters: activeFilters } = useSelector((state) => state.filters)
  const isActiveFilters = Object.keys(activeFilters).some((f) => f != 'page')

  return (
    <>
      {activeFilters && isActiveFilters && (
        <div className={`${s.selected}`}>
          <p tabIndex={0}>Обрано {productsCount} товарів</p>
          <button
            className={`${s.cancel_all_btn} button_danger_secondary`}
            onClick={() => {
              dispatch(startLoading())
              dispatch(deleteAllFilters())
              router.push(`/products/${router.query.categoryPath}/page=1`)
            }}
            aria-label='Скасувати всі фільтри товарів'
          >
            Скасувати
          </button>
        </div>
      )}
    </>
  )
}

export default Selected
