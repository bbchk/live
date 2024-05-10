import s from './filter_item.module.scss'

import CheckBox from 'comps/input_fields/checkbox'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import { slugify } from '@bbuukk/slugtrans/slugify'
import { setFilter, deleteFilter } from 'store/slices/filters.slice'

const FilterChecks = ({ filterLabel, options, idx }) => {
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

  return (
    <section className={`${s.filter_item}`}>
      {Array.from(options).map((option) => {
        const isChecked = filters[slugFilterLabel]?.includes(
          slugify(transliterate(option)),
        )

        return (
          <div key={option} className={`${s.checkbox}`}>
            <CheckBox
              id={option}
              label={option}
              checked={isChecked}
              handleChange={handleChange}
            />
          </div>
        )
      })}
    </section>
  )
}

export default FilterChecks
