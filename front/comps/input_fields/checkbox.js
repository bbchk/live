import s from './checkbox.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'

const CheckBox = ({ id, label, checked, handleChange }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  return (
    <label htmlFor={id} className={`form-check ${s.form_check}`}>
      <input
        className={`form-check-input ${isChecked ? s.active : ''}`}
        type='checkbox'
        checked={isChecked}
        onChange={(e) => {
          dispatch(startLoading())
          handleChange(e.target.checked, label)
          setIsChecked(e.target.checked)
        }}
        id={id}
      />
      <span className='form-check-label'>{label}</span>
    </label>
  )
}

export default CheckBox
