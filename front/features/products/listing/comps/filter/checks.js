import CheckBox from "root/comps/checkbox";
import { Accordion } from "react-bootstrap";
import { useEffect, useId, useRef } from "react";
import { useProductContext } from "../../../../../hooks/useProductContext";

const FilterChecks = ({ filter, idx }) => {
  const isFirstRender = useRef(true);
  const { dispatch } = useProductContext();

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

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
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
                  check={check}
                />
              </div>
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default FilterChecks;
