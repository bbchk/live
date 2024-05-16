import React, { useState } from 'react'
import PriceSlider from '../filter_items/price-slider'
import FilterChecks from '../filter_items/filter_item'
import s from './filters_accordion.module.scss'
import Accordion from 'comps/accordion/accordion'
import AccordionItem from 'comps/accordion/accordion_item'
import TabIndexButton from 'comps/accessibility/indexTabButton.js'

//   //todo sometimes it changes filterValues when another one is chosen
//   //todo fix all remaining english options in filters
//   //todo why filters render in wrong order, brand got to be first
//   //todo price does not refresh on categoryPath change

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
        <TabIndexButton aria-label={`Перейти до опцій фільтра ціна`}>
          <AccordionItem label='Ціна'>
            <PriceSlider minMax={minMax} />
          </AccordionItem>
        </TabIndexButton>

        {filters.map(([filterLabel, options], idx) => {
          return (
            <TabIndexButton
              key={filterLabel}
              aria-label={`Перейти до опцій фільтра ${filterLabel}`}
            >
              <AccordionItem label={filterLabel} open={idx < 4}>
                <FilterChecks
                  filterLabel={filterLabel}
                  options={options}
                  idx={idx + 1}
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
