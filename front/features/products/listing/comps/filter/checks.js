import { v4 as uuidv4 } from "uuid";
import CheckBox from "root/comps/checkbox";
import { Accordion } from "react-bootstrap";

const FilterChecks = ({ filterName, idx, options }) => {
  console.log(idx);
  return (
    <Accordion.Item eventKey={idx}>
      <Accordion.Header>{filterName}</Accordion.Header>
      <Accordion.Body>
        {Array.from(options).map((brand, index) => (
          <CheckBox key={index} label={brand} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
