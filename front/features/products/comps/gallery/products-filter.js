import PriceSlider from "./price-slider";
import FilterChecks from "./products-filter-checks";
import s from "./products-filter.module.scss";

const ProductFilter = () => {
  return (
    <div className={`${s.product_filter}`}>
      <div className={`${s.price_slider}`}>
        <PriceSlider />
      </div>
      <hr className={`${s.splitter}`} />
      <div className={`${s.filter_checks}`}>
        <div className={`${s.check}`}>
          <FilterChecks
            filterBy="Бренд"
            isOpen={true}
            options={["Asus", "Acer", "Apple", "Lenovo", "Xioami"]}
          />
        </div>
        <hr className={`${s.splitter}`} />
        <div className={`${s.check}`}>
          <FilterChecks
            filterBy="Бренд"
            isOpen={true}
            options={["Asus", "Acer", "Apple", "Lenovo", "Xioami"]}
          />
        </div>
        <hr className={`${s.splitter}`} />
        <div className={`${s.check}`}>
          <FilterChecks
            filterBy="Бренд"
            isOpen={true}
            options={["Asus", "Acer", "Apple", "Lenovo", "Xioami"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
