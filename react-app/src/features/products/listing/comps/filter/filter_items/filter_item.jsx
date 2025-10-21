import s from './filter_item.module.scss'

import CheckBox from 'comps/input_fields/checkbox'

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useId, useState, useRef } from 'react'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import { slugify } from '@bbuukk/slugtrans/slugify'
import { setFilter, deleteFilter } from 'store/slices/filters.slice'
import useArrowKeyNavigation from 'hooks/use_arrow_keys_navigation'

const FilterChecks = ({ filterLabel, options, idx }) => {
  const handleArrowKeys = useArrowKeyNavigation()

  const { filters } = useSelector((state) => state.filters)

  const slugFilterLabel = slugify(transliterate(filterLabel))
  const [activeOptions, setActiveOptions] = useState([])

  useEffect(() => {
    setActiveOptions(filters[slugFilterLabel])
  }, [filters])

  const dispatch = useDispatch()

  useEffect(() => {
    if (activeOptions != null) {
      if (activeOptions.length > 0) {
        dispatch(
          setFilter({
            filterName: slugFilterLabel,
            filterValue: activeOptions,
          }),
        )
      } else {
        dispatch(deleteFilter({ filterName: slugFilterLabel }))
      }
    }
  }, [activeOptions])

  function handleChange(isChecked, option) {
    const slugOption = slugify(transliterate(option))
    if (isChecked) {
      if (activeOptions != null) {
        setActiveOptions([...activeOptions, slugOption])
      } else {
        setActiveOptions([slugOption])
      }
    } else {
      setActiveOptions(
        activeOptions.filter((activeOption) => activeOption !== slugOption),
      )
    }
  }

  const id = useId()

  const checkboxRefs = options.map(() => React.createRef())

  return (
    <ul
      className={`${s.filter_item}`}
      tabIndex={-1}
      id={`${filterLabel}-filter-item`}
    >
      {Array.from(options).map((option, idx) => {
        const isChecked = filters[slugFilterLabel]?.includes(
          slugify(transliterate(option)),
        )

        return (
          <li key={option} className={`${s.checkbox}`}>
            <CheckBox
              ref={checkboxRefs[idx]}
              id={`${id}-${idx}`}
              label={option}
              checked={isChecked}
              handleChange={handleChange}
              handleArrows={(e) =>
                handleArrowKeys(e, {
                  ArrowDown: checkboxRefs[idx + 1]?.current,
                  ArrowUp: checkboxRefs[idx - 1]?.current,
                  Home: checkboxRefs[0]?.current,
                  End: checkboxRefs[checkboxRefs.length - 1]?.current,
                })
              }
            />
          </li>
        )
      })}
    </ul>
  )
}

export default FilterChecks
