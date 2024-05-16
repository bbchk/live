import s from './accordion_item.module.scss'

import { useState } from 'react'

import { Accordion as A } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { KeyboardArrowUpRounded } from '@mui/icons-material'

const AccordionItem = ({ eventKey, label, children, open = true }) => {
  const [isOpen, setIsOpen] = useState(open)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Card eventKey={eventKey} className={`${s.item}`}>
      <Card.Header className={`${s.header}`}>
        <button
          className={`${s.toggler} ${isOpen ? s.open : s.closed}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрити' : 'Відкрити'}
        >
          {label}
          <KeyboardArrowUpRounded />
        </button>
      </Card.Header>
      <A.Collapse eventKey={eventKey} in={isOpen}>
        <Card.Body>{children}</Card.Body>
      </A.Collapse>
    </Card>
  )
}

export default AccordionItem
