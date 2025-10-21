import { useEffect } from 'react'
import { setFilters } from 'store/slices/filters.slice'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

const getFilterMapFromStr = (filtersStr) => {
  let filters = {}
  if (filtersStr) {
    filtersStr.split(';').forEach((fs) => {
      const [filterName, filterValue] = fs.split('=')
      filters[filterName] = filterValue.split(',')
    })
  }
  return filters
}

export const useDispatchInitialFilters = () => {
  const dispatch = useDispatch()

  const router = useRouter()
  const { filtersStr } = router.query

  useEffect(() => {
    const filtersMap = getFilterMapFromStr(filtersStr)
    dispatch(setFilters(filtersMap))

    return () => {
      dispatch(setFilters({}))
    }
  }, [])
}
