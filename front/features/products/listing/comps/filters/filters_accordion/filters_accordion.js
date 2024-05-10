import PriceSlider from '../filter_items/price-slider';
import FilterChecks from '../filter_items/filter_item';
import s from './filters_accordion.module.scss';
import Accordion from 'comps/accordion/accordion';
import AccordionItem from 'comps/accordion/accordion_item';
import { transliterate } from '@bbuukk/slugtrans/transliterate';
import { slugify } from '@bbuukk/slugtrans/slugify';

//   //todo sometimes it changes filterValues when another one is chosen
//   //todo fix all remaining english options in filters
//   //todo why filters render in wrong order, brand got to be first
//   //todo price does not refresh on categoryPath change
const FiltersAccordion = ({
  id,
  filters,
  minMaxPrice: minMax,
  show = true,
}) => {
  return (
    <search>
      <Accordion id={id}>
        <AccordionItem id={'priceSlicerAccItem'} label="Ціна" show={show}>
          <PriceSlider minMax={minMax} />
        </AccordionItem>
        {filters.map(([filterLabel, options], idx) => {
          return (
            <AccordionItem
              key={filterLabel}
              id={slugify(transliterate(filterLabel))}
              label={filterLabel}
              show={show}
            >
              <FilterChecks
                filterLabel={filterLabel}
                options={options}
                idx={idx + 1}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </search>
  );
};

export default FiltersAccordion;
