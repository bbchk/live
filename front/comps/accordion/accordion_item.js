import s from './accordion_item.module.scss'

import { Accordion as A } from 'react-bootstrap'

const AccordionItem = ({ eventKey, label, show = false, children }) => {
  return (
    <A.Item eventKey={eventKey} className={`${s.item}`}>
      <A.Header className={`${s.header}`}>{label}</A.Header>
      <A.Body>{children}</A.Body>
    </A.Item>
  )
}

export default AccordionItem
