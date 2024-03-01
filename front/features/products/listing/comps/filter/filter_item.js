import s from "./filters_accordion.module.scss";

import CheckBox from "./checkbox";
import { Accordion } from "react-bootstrap";

const FilterChecks = ({ filterLabel, options, idx }) => {
  return (
    <Accordion.Item
      className={`${s.accordion_item}`}
      eventKey={idx}
      // bsPrefix="filter_acc_item"
    >
      <Accordion.Header>{filterLabel}</Accordion.Header>
      <Accordion.Body>
        {Array.from(options).map((option) => {
          return (
            <div key={option}>
              <CheckBox id={option} label={option} checked={false} />
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterChecks;
