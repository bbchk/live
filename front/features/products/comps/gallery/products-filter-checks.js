import { useId } from "react";

import CheckBox from "@/comps/checkbox";

const FilterChecks = ({ filterBy, isOpen, options }) => {
  const id = useId();

  //todo make try catch for this in parent element
  if (!Array.isArray(options)) {
    throw new Error("Prop 'options' must be an array");
  }
  return (
    <div>
      <p className="mb-3">
        <a
          className="mb-3"
          data-bs-toggle="collapse"
          href={"#" + id}
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="bi bi-caret-down-fill"></i>
          {filterBy}
        </a>
      </p>
      <div className={`collapse ${isOpen ? "show" : ""}`} id={id}>
        <div className=" border-0">
          {options.map((brand, index) => (
            <CheckBox key={index} label={brand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChecks;
