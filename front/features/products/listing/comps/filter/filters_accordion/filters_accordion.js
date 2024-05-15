import React, { useState, useId, useRef } from 'react'
import PriceSlider from '../filter_items/price-slider'
import FilterChecks from '../filter_items/filter_item'
import s from './filters_accordion.module.scss'
import Accordion from 'comps/accordion/accordion'
import AccordionItem from 'comps/accordion/accordion_item'
import TabIndexButton from '#root/comps/accessibility/indexTabButton.js'

//   //todo sometimes it changes filterValues when another one is chosen
//   //todo fix all remaining english options in filters
//   //todo why filters render in wrong order, brand got to be first
//   //todo price does not refresh on categoryPath change

//todo make tabIndexButton load only if user is actually tabbing

const FiltersAccordion = ({ filters, minMaxPrice: minMax, show = true }) => {
  const fiilterAccordionId = 'filtersAccordion'
  return (
    <search>
      <Accordion
        defaultActiveKey={['0', '1', '2', '3'].map(
          (idx) => fiilterAccordionId + '-' + idx,
        )}
        flush
        alwaysOpen
      >
        <TabIndexButton
          aria-label='Фільтрувати за ціною'
          aria-description='Перейти до фільтра'
        >
          <AccordionItem
            eventKey={`${fiilterAccordionId}-${0}`}
            label='Ціна'
            // aria-label={`Фільтрувати за ціною`}
          >
            <PriceSlider minMax={minMax} />
          </AccordionItem>
        </TabIndexButton>

        {filters.map(([filterLabel, options], idx) => {
          return (
            <TabIndexButton
              key={filterLabel}
              aria-label='Фільтрувати за ціною'
              aria-description='Перейти до фільтра'
            >
              <AccordionItem
                eventKey={`${fiilterAccordionId}-${idx + 1}`}
                label={filterLabel}
                show={show}
              >
                <FilterChecks
                  filterLabel={filterLabel}
                  options={options}
                  idx={idx + 1}
                  // tabIndex={tabToSubcats ? 0 : -1}
                  //               onBlur={() => {
                  //   if (idx == LAST_CATEGORY_IDX) {
                  //     setTabToSubcats(false)
                  //   }
                  // }}
                />
              </AccordionItem>
            </TabIndexButton>
          )
        })}
      </Accordion>
    </search>
  )
}

export default FiltersAccordion
