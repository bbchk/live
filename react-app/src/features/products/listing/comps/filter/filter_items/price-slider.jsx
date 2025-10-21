import Slider from '@mui/material/Slider'
import React, { use, useEffect, useState } from 'react'
import s from './price-slider.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from 'store/slices/filters.slice'
import { useNavigate, useLocation } from 'react-router-dom'
import { startLoading } from 'store/slices/global_comps/global_comps.slice.js'

//todo inconsistent currentMinMax, it changes on page refresh, when set on some points lower
const PriceSlider = ({ minMax }) => {
  const MIN_DISTANCE = 10

  const { filtersStr } = useRouter().query
  const dispatch = useDispatch()

  const [minMaxPrice, setMinMaxPrice] = useState([minMax[0], minMax[1]])
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const { filters: activeFilters } = useSelector((state) => state.filters)

  useEffect(() => {
    //resetting price slider when all filters are removed
    if (Object.keys(activeFilters).length === 0) {
      setMinMaxPrice([minMax[0], minMax[1]])
    } else {
      const isPriceFilterApplied = Object.keys(activeFilters).includes('tsina')
      if (isPriceFilterApplied) {
        setMinMaxPrice(activeFilters.tsina)
      } else {
        setMinMaxPrice([minMax[0], minMax[1]])
      }
    }
  }, [activeFilters])

  useEffect(() => {
    if (minMaxPrice[1] > minMax[1] || minMaxPrice[0] < minMax[0]) {
      setSubmitDisabled(true)
    } else {
      setSubmitDisabled(false)
    }
  }, [minMaxPrice])

  function handleConfirm(event, newValue) {
    if (activeFilters?.tsina) {
      if (minMaxPrice.toString() === activeFilters.tsina.toString()) {
        return
      }
    }

    dispatch(startLoading())
    dispatch(
      setFilter({
        filterName: 'tsina',
        filterValue: [minMaxPrice[0], minMaxPrice[1]],
      }),
    )
  }

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }
    if (newValue[1] - newValue[0] < MIN_DISTANCE) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], minMax[1] - MIN_DISTANCE)

        setMinMaxPrice([clamped, clamped + MIN_DISTANCE])
      } else {
        const clamped = Math.max(newValue[1], MIN_DISTANCE)
        setMinMaxPrice([clamped - MIN_DISTANCE, clamped])
      }
    } else {
      setMinMaxPrice(newValue)
    }
  }

  const handleInputChange = (index) => (event) => {
    const newValues = [...minMaxPrice]
    newValues[index] =
      event.target.value === '' ? 0 : Number(event.target.value)
    setMinMaxPrice(newValues)
  }

  return (
    <div className={`${s.price_slider}`}>
      <div className={`${s.header}`}>
        <input
          value={minMaxPrice[0]}
          onChange={handleInputChange(0)}
          className={`form-control ${s.input} ${s.left}`}
          aria-label='Ліва межа ціни'
          type='number'
        />
        <span>—</span>

        <input
          value={minMaxPrice[1]}
          onChange={handleInputChange(1)}
          className={`form-control ${s.input} ${s.right}`}
          aria-label='Права межа ціни'
          type='number'
        />
        <button
          onClick={handleConfirm}
          className={`button_primary ${s.ok_btn}`}
          aria-label='Фільтрувати за ціною'
          disabled={submitDisabled}
        >
          Ok
        </button>
      </div>
      <div className={`${s.body}`}>
        <Slider
          range='true'
          min={minMax[0]}
          max={minMax[1]}
          step={10}
          value={minMaxPrice}
          onChange={handleChange}
          className={s.slider}
          disableSwap
          getAriaLabel={(index) =>
            index === 0 ? 'Ліва межа ціни' : 'Права межа ціни'
          }
        />
      </div>
    </div>
  )
}

export default PriceSlider
