import { v4 as uuidv4 } from "uuid";
import { Accordion } from "react-bootstrap";

import PriceSlider from "./price-slider";
import FilterChecks from "./checks";
import s from "./products-filter.module.scss";
import { useEffect, useRef, useState } from "react";
// import { useGetFilters } from "../../hooks/useGetFilters";

const ProductFilter = ({ products, set }) => {
  const [minMaxPrice, setMinMaxPrice] = useState([0, 100]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const { min, max, filters } = useGetFilters(products);
    // setMinMaxPrice([min, max]);
    // setFilters(filters);
    // setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <div className={`${s.product_filter}`}>
          <div className={`${s.price_slider}`}>
            <PriceSlider minPrice={minMaxPrice[0]} maxPrice={minMaxPrice[1]} />
          </div>
          <hr className={`${s.splitter}`} />
          <Accordion defaultActiveKey={[0, 1, 2, 3, 4]} alwaysOpen flush>
            {filters.map((filter, idx) => {
              return (
                <div key={uuidv4()} className={`${s.filter_checks}`}>
                  <FilterChecks filter={filter} idx={idx} />
                </div>
              );
            })}
          </Accordion>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
