import CheckBox from "root/comps/checkbox";
import { Accordion } from "react-bootstrap";
import { useId } from "react";
import { useProductContext } from "../../../../../hooks/useProductContext";

const FilterChecks = ({ filter, idx }) => {
  const context = useProductContext();
  const { allProducts, currentProducts } = context.products || {};
  const { dispatch } = context;

  const check = (option, isChecked) => {
    if (isChecked) {
      //todo plus filter
      dispatch({
        type: "SET_PRODUCTS",
        payload: { currentProducts: [] },
      });
    } else {
      //todo minus filter
      // currentProducts.fiter
    }
  };

  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>{filter.name}</Accordion.Header>
      <Accordion.Body>
        {Array.from(filter.options).map((option) => {
          const id = useId();
          return (
            <div key={id}>
              <CheckBox
                id={id}
                prop={filter.prop}
                label={option}
                checked={false}
                check={check}
              />
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
