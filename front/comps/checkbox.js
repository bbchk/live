import { useId } from "react";

const CheckBox = ({ label }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={useId()}
        role="button"
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
