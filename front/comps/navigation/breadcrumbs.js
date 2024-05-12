import s from './breadcrumbs.module.scss'
import Link from 'next/link'
import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAllFilters } from 'store/slices/filters.slice'

import { startLoading } from 'store/slices/global_comps/global_comps.slice'

import { getCategoriesInfo } from 'store/slices/categories.slice'
import { useEffect } from 'react'
import { CottageRounded } from '@mui/icons-material'

const Breadcrumbs = ({ category }) => {
  const dispatch = useDispatch()

  const { categories: allCategories } = useSelector((state) => state.categories)

  const status = useSelector((state) => state.categories.status)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCategoriesInfo())
    }
  }, [status, dispatch])

  function handleNavigate() {
    dispatch(startLoading())
    dispatch(deleteAllFilters())
  }

  return (
    <>
      <nav
        className={`${s.breadcrumbs}`}
        aria-label='Category path breadcrumbs'
      >
        <ol className='breadcrumb'>
          <li className={`breadcrumb-item ${category ? '' : s.active}`}>
            <Link href='/'>
              <CottageRounded />
              Головна
            </Link>
          </li>

          {allCategories &&
            category &&
            category.path?.split(',').map((pathPart, index, pathParts) => {
              const clickedCategoryIndex = index + 1
              const clickedCategoryPath = pathParts
                .slice(0, clickedCategoryIndex)
                .join(',')
              const categoryPathSlug = slugify(
                transliterate(clickedCategoryPath),
              )

              const isActive = index === pathParts.length - 1

              return (
                <li
                  className={`breadcrumb-item ${s.item} ${
                    isActive ? s.active : ''
                  }`}
                  key={pathPart}
                >
                  <Link
                    href={`/products/${categoryPathSlug}/page=1`}
                    onClick={handleNavigate}
                  >
                    {pathPart}
                  </Link>
                </li>
              )
            })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
