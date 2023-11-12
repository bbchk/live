import { v4 as uuidv4 } from "uuid";
import CheckBox from "root/comps/checkbox";
import { Accordion } from "react-bootstrap";

const FilterChecks = ({ filterName, idx, options }) => {
  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>{filterName}</Accordion.Header>
      <Accordion.Body>
        {Array.from(options).map((option) => (
          <div key={uuidv4()}>
            <CheckBox label={option} checked={false} />
          </div>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
