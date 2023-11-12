import { v4 as uuidv4 } from "uuid";
import { Accordion } from "react-bootstrap";

import PriceSlider from "./price-slider";
import FilterChecks from "./checks";
import s from "./products-filter.module.scss";
import { useEffect, useId, useRef, useState } from "react";

const ProductFilter = ({ products }) => {
  const maxPrice = useRef(0);
  const minPrice = useRef(0);
  const filters = useRef([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    if (filters.current.length == 0) {
      const prices = products.map((p) => Number(p.price));
      minPrice.current = prices.reduce((a, b) => Math.min(a, b), Infinity);
      maxPrice.current = prices.reduce((a, b) => Math.max(a, b), -Infinity);

      const properties = [
        { filterName: "Brands", prop: "brand" },
        { filterName: "Weights", prop: "weight" },
        { filterName: "Packigns", prop: "packing" },
        { filterName: "Sizes", prop: "size" },
        { filterName: "Colors", prop: "color" },
      ];

      properties.forEach(({ filterName, prop }) => {
        const filter = createFilter(filterName, prop);
        if (filter) {
          filters.current.push(filter);
        }
      });

      console.log(filters);
      setIsLoading(false);
    }
  }, []);

  const createFilter = (name, property) => {
    let filter = null;
    const options = new Set(
      products
        .filter((product) => product[property])
        .map((product) => product[property])
    );

    if (options.size > 0) {
      filter = {};
      filter.name = name;
      filter.options = options;
    }

    return filter;
  };

  return (
    <>
      {!isLoading && (
        <div className={`${s.product_filter}`}>
          <div className={`${s.price_slider}`}>
            <PriceSlider
              minPrice={minPrice.current}
              maxPrice={maxPrice.current}
            />
          </div>
          <hr className={`${s.splitter}`} />
          <Accordion defaultActiveKey={[0, 1, 2, 3, 4]} alwaysOpen flush>
            {filters.current.map(({ name, options }, idx) => {
              return (
                <div key={uuidv4()} className={`${s.filter_checks}`}>
                  <FilterChecks filterName={name} idx={idx} options={options} />
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
