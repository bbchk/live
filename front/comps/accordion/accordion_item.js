import s from "./accordion_item.module.scss";

import { Accordion as A } from "react-bootstrap";

const AccordionItem = ({ eventKey, label, show = false, children }) => {
  return (
    <A.Item eventKey={eventKey}>
      <A.Header>{label}</A.Header>
      <A.Body>{children}</A.Body>
    </A.Item>
  );
};

export default AccordionItem;
