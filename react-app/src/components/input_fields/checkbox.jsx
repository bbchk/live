import React from 'react'
import s from './checkbox.module.scss'

import { useDispatch } from 'react-redux'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'

const CheckBox = React.forwardRef(
  ({ id, label, checked, handleChange, handleArrows }, ref) => {
    const dispatch = useDispatch()

    const handleKeyDown = (event) => {
      if (event.key !== 'Meta') {
        if (event.key === 'Enter') {
          toggleCheck()
        } else {
          if (handleArrows) {
            handleArrows(event)
          }
        }
      }
    }

    const toggleCheck = () => {
      dispatch(startLoading())
      handleChange(!checked, label)
    }

    return (
      <label htmlFor={id} className={`form-check ${s.form_check}`}>
        <input
          ref={ref}
          className={`form-check-input ${checked ? s.active : ''}`}
          type='checkbox'
          checked={checked}
          onChange={toggleCheck}
          onKeyDown={handleKeyDown}
          id={id}
        />
        <span className='form-check-label'>{label}</span>
      </label>
    )
  },
)

export default CheckBox
