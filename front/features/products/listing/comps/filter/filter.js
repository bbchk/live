import { v4 as uuidv4 } from "uuid";
import { Accordion } from "react-bootstrap";

import PriceSlider from "./price-slider";
import FilterChecks from "./checks";
import s from "./products-filter.module.scss";
import { useEffect, useRef, useState } from "react";

const ProductFilter = ({ currentProducts }) => {
  const isFirstRender = useRef(true);

  const maxPrice = useRef(0);
  const minPrice = useRef(0);
  const filters = useRef([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    if (!currentProducts || !isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;

    //todo delete this if
    if (filters.current.length == 0) {
      const prices = currentProducts.map((p) => Number(p.price));
      minPrice.current = prices.reduce((a, b) => Math.min(a, b), Infinity);
      maxPrice.current = prices.reduce((a, b) => Math.max(a, b), -Infinity);

      const filterObjects = [
        { name: "Brands", prop: "brand" },
        { name: "Weights", prop: "weight" },
        { name: "Packigns", prop: "packing" },
        { name: "Sizes", prop: "size" },
        { name: "Colors", prop: "color" },
      ];

      filterObjects.forEach(({ name, prop }) => {
        const filter = createFilter(name, prop);
        if (filter) {
          filters.current.push(filter);
        }
      });

      setIsLoading(false);
    }
  }, [currentProducts]);

  const createFilter = (name, property) => {
    let filter = null;
    const options = new Set(
      currentProducts
        .filter((product) => product[property])
        .map((product) => product[property])
    );

    if (options.size > 0) {
      filter = {};
      filter.name = name;
      filter.options = options;
      filter.prop = property;
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
            {filters.current.map((filter, idx) => {
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
