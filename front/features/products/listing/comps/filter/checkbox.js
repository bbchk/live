import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const CheckBox = ({ id, prop, label, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const { activeFilters, dispatch } = useActiveFiltersContext();

  function handleChange() {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch({
        type: "ADD_FILTER",
        payload: {
          option: label,
          prop: prop,
        },
      });
    } else {
      dispatch({
        type: "REMOVE_FILTER",
        payload: {
          option: label,
          prop: prop,
        },
      });
    }
  }

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
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
