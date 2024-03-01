import { v4 as uuidv4 } from "uuid";
import { Accordion } from "react-bootstrap";

import PriceSlider from "./price-slider";
import FilterChecks from "./filter_item";
import s from "./filters_accordion.module.scss";
import { useEffect, useRef, useState } from "react";
import { useGetFilters } from "../../hooks/useGetFilters";

const FiltersAccordion = ({ products, category }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { getFilters, getMinMaxPrice } = useGetFilters();
  const [minMaxPrice, setMinMaxPrice] = useState(getMinMaxPrice(products));
  const [filters, setFilters] = useState(getFilters(products, category));

  useEffect(() => {
    // setMinMaxPrice([min, max]);
    // setFilters(filters);
    // setIsLoading(false);
  }, [filters]);

  //todo
  // fetch products with query params
  return (
    <div className={`${s.filters_container}`}>
      {!isLoading && (
        <Accordion
          className={`${s.filter_accordion}`}
          defaultActiveKey={[0, 1, 2, 3, 4]}
          alwaysOpen
          flush
          // onSelect={() => {
          //   console.log("selecteds");
          // }}
          // bsPrefix={"acc"}
        >
          <Accordion.Item
            className={`${s.accordion_item} ${s.price_slider_item}`}
            eventKey={0}
          >
            <Accordion.Header>Ціна</Accordion.Header>
            <Accordion.Body>
              <div className={`${s.price_slider}`}>
                <PriceSlider
                  minPrice={minMaxPrice[0]}
                  maxPrice={minMaxPrice[1]}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          {Array.from(filters, ([filterLabel, options], idx) => (
            <div key={filterLabel} className={`${s.filter_checks}`}>
              <FilterChecks
                filterLabel={filterLabel}
                options={options}
                idx={idx + 1}
              />
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default FiltersAccordion;
