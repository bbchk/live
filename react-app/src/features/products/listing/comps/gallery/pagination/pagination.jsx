import { useNavigate, useLocation } from 'react-router-dom'

import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from '@mui/icons-material'

import Link from 'next/link'

import s from './pagination.module.scss'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const FIRST_PAGE = 1
//todo refactoring
function ProductsPagination({ numPages, activePageId }) {
  const dispatch = useDispatch()

  const router = useRouter()
  const { categoryPath, filtersStr } = router.query
  const getPath = (pageId) => {
    const filtersStrWithNewPageId = filtersStr.replace(
      /page=\d+/,
      `page=${pageId}`,
    )

    return `/products/${categoryPath}/${filtersStrWithNewPageId}`
  }

  const isActive = (pageId) => pageId == activePageId

  const PaginationItem = ({
    pageId,
    onClick,
    children,
    disabled = false,
    ariaLabel = null,
  }) => {
    return (
      <li className={`${s.item}`}>
        <Link
          className={`${isActive(pageId) ? s.active : ''} ${
            disabled ? s.disabled : ''
          }`}
          aria-label={
            ariaLabel
              ? ariaLabel
              : isActive(pageId)
                ? 'Поточна сторінка'
                : `Перейти на сторінку номер ${pageId}`
          }
          aria-disabled={disabled}
          disabled={disabled}
          href={getPath(pageId)}
          onClick={(event) => {
            if (isActive(pageId) || pageId == undefined) {
              event.preventDefault()
            } else {
              if (onClick) onClick()
              dispatch(startLoading())
            }
          }}
        >
          {children}
        </Link>
      </li>
    )
  }

  const [currentPage, setCurrentPage] = useState(activePageId)
  const maxPageItems = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2))
  let endPage = Math.min(numPages, startPage + maxPageItems - 1)

  if (endPage - startPage + 1 < maxPageItems) {
    startPage = Math.max(1, endPage - maxPageItems + 1)
  }

  const pageItems = []
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <PaginationItem key={i} pageId={i}>
        <p>{i}</p>
      </PaginationItem>,
    )
  }

  if (startPage > 1) {
    pageItems.unshift(
      <PaginationItem
        key={'left_elipsis'}
        pageId={startPage - 1}
        onClick={() => setCurrentPage(startPage - 1)}
      >
        ...
      </PaginationItem>,
    )
  }

  if (endPage < numPages) {
    pageItems.push(
      <PaginationItem
        key={'right_elipsis'}
        pageId={endPage + 1}
        onClick={() => setCurrentPage(endPage + 1)}
      >
        ...
      </PaginationItem>,
    )
  }

  return (
    <>
      {numPages > 1 && (
        <nav aria-label='pagination'>
          <ul className={`${s.pagination}`}>
            <li>
              <ul className={`${s.controls}`}>
                <PaginationItem
                  pageId={1}
                  ariaLabel='Перейти на найпершу сторінку'
                  disabled={isActive(FIRST_PAGE)}
                >
                  <KeyboardDoubleArrowLeftRounded />
                </PaginationItem>
                <PaginationItem
                  pageId={Math.max(1, Number(activePageId) - 1)}
                  ariaLabel='Перейти на попередню сторінку'
                  disabled={isActive(FIRST_PAGE)}
                >
                  <KeyboardArrowLeftRounded />
                </PaginationItem>
              </ul>
            </li>

            <li>
              <ul className={`${s.pages}`}>{pageItems}</ul>
            </li>
            <li className={`${s.pages}`}>
              Сторінка {activePageId} з {numPages}
            </li>
            <li>
              <ul className={`${s.controls}`}>
                <PaginationItem
                  pageId={Math.max(1, Number(activePageId) + 1)}
                  ariaLabel='Перейти на наступну сторінку'
                  disabled={isActive(numPages)}
                >
                  <KeyboardArrowRightRounded />
                </PaginationItem>
                <PaginationItem
                  pageId={numPages}
                  ariaLabel='Перейти на останню сторінку'
                  disabled={isActive(numPages)}
                >
                  <KeyboardDoubleArrowRightRounded />
                </PaginationItem>
              </ul>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default ProductsPagination
