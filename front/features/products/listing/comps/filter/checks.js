import { v4 as uuidv4 } from "uuid";
import CheckBox from "./checkbox";
import { Accordion } from "react-bootstrap";
import { useEffect, useId, useRef } from "react";
import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const FilterChecks = ({ filter: { name, options, prop }, idx }) => {
  return (
    <>
      <Accordion.Item eventKey={idx}>
        <Accordion.Header>{name}</Accordion.Header>
        <Accordion.Body>
          {Array.from(options).map((option) => {
            const key = uuidv4();
            return (
              <div key={key}>
                <CheckBox id={key} prop={prop} label={option} checked={false} />
              </div>
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default FilterChecks;
