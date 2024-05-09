import s from "./accordion.module.scss";
import { Accordion as A } from "react-bootstrap";

const Accordion = ({ defaultActiveKey, children, ...props }) => {
  return (
    <A defaultActiveKey={defaultActiveKey} {...props}>
      {children}
    </A>
  );
};

export default Accordion;
