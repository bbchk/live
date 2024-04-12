import s from "./file_input.module.scss"; // adjust the path to your CSS module

const FileInput = ({
  accept,
  handleImageChange,
  multiple,
  label,
  ...props
}) => {
  return (
    <label className={`${s.file_input_label}`}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleImageChange}
        multiple={multiple}
        {...props}
      />
      {label}
    </label>
  );
};

export default FileInput;
