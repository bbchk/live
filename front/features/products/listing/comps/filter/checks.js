import CheckBox from "root/comps/checkbox";
import { Accordion } from "react-bootstrap";
import { useId } from "react";

const FilterChecks = ({ filterName, idx, options }) => {
  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>{filterName}</Accordion.Header>
      <Accordion.Body>
        {Array.from(options).map((option) => {
          const id = useId();
          return (
            <div key={id}>
              <CheckBox id={id} label={option} checked={false} />
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
