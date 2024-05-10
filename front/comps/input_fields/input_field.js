import { useId } from 'react';
import s from './input_field.module.scss';

const InputField = ({
  type,
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled,
}) => {
  const id = useId();

  return (
    <div className={`form-floating ${s.input_container}`}>
      <input
        type={type}
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label className={`form-label ${s.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default InputField;
