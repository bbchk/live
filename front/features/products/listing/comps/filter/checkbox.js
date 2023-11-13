import { useEffect, useRef, useState } from "react";
import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const CheckBox = ({ id, prop, label, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const isFirstRender = useRef(true);
  const { activeFilters, dispatch } = useActiveFiltersContext();

  useEffect(() => {
    console.log("effect");
    if (!isFirstRender.current) {
      if (isChecked) {
        //todo plus filter
        dispatch({
          type: "ADD_FILTER",
          payload: {
            option: label,
            prop: prop,
            f: (product) => {
              if (product[prop] == label) {
                return product;
              }
            },
          },
        });
      } else {
        //  //todo minus filter
        dispatch({
          type: "REMOVE_FILTER",
          payload: {
            option: label,
            prop: prop,
          },
        });
      }
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
