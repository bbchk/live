import { useEffect, useRef, useState } from "react";

const CheckBox = ({ id, prop, label, checked, check }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const saved = useRef(isChecked);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      check(label, isChecked);
    }
    isFirstRender.current = false;
  }, [isChecked]);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        id={id}
        role="button"
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
