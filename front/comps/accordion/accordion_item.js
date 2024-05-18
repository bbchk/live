import s from './accordion_item.module.scss'

import { useId } from 'react'

import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

const AccordionItem = ({ label, children, expanded = true }) => {
  const id = useId()

  return (
    <>
      <MuiAccordion
        defaultExpanded={expanded}
        slotProps={{ transition: { unmountOnExit: true } }}
        className={s.accordion} // Add class to MuiAccordion
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`panel-header-${id}`}
          id={`panel-header-${id}`}
          className={s.summary} // Add class to AccordionSummary
        >
          {label}
        </AccordionSummary>
        <AccordionDetails className={s.details}>{children}</AccordionDetails>
      </MuiAccordion>
    </>
  )
}

export default AccordionItem
