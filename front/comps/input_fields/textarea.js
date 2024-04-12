import s from "./textarea.module.scss";

const TextArea = ({ value, onChange, placeholder, rows = 3, ...props }) => {
  return (
    <textarea
      className={`${s.textarea}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
