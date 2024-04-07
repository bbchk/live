import s from "./filters_offcanvas.module.scss";
import Offcanvas from "comps/offcanvas/offcanvas";
import OffcanvasHeader from "comps/offcanvas/offcanvas_header";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";
import FiltersAccordion from "../filters_accordion/filters_accordion";

import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const FiltersOffcanvas = ({
  id,
  filters,
  minMaxPrice,
  currentMinMaxPrice,
  productsCount,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filters: activeFilters } = useSelector((state) => state.filters);

  const isActiveFilters = Object.keys(activeFilters).some((f) => f != "page");

  //todo make it cancel_all_filters button rerender whole offcanvas for filters to refresh
  //todo make filterItems in filtersAccordion unique

  return (
    <div className={`${s.offcanvas}`}>
      <Offcanvas id={id}>
        <OffcanvasHeader id={`${id}Header`}>
          <header>
            <i className="bi bi-funnel-fill" />
            <h2>Фільтри</h2>
          </header>
        </OffcanvasHeader>

        <OffcanvasBody>
          <div className={`${s.offcanvas_filter_body}`}>
            {activeFilters && isActiveFilters && (
              <button
                className={`${s.cancel_all_btn} button_danger_secondary`}
                onClick={() => {
                  dispatch(deleteAllFilters());
                  router.push(`/products/${router.query.categoryPath}/page=1`);
                }}
              >
                Скасувати усі фільтри
              </button>
            )}

            <FiltersAccordion
              id="filtersOffcanvasAccordion"
              filters={filters}
              minMaxPrice={minMaxPrice}
              currentMinMaxPrice={currentMinMaxPrice}
              show={false}
            />
          </div>
        </OffcanvasBody>
        <footer>
          {activeFilters && isActiveFilters ? (
            <>
              <p>{`Знайдено ${productsCount} товарів`}</p>
              <button
                className="button_submit"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target={`#${id}`}
                aria-controls={id}
                onClick={() => {
                  router.push(
                    `/products/${router.query.categoryPath}/${router.query.filtersStr}`
                  );
                }}
              >
                Показати
              </button>
            </>
          ) : (
            <button
              className="button_primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#${id}`}
              aria-controls={id}
            >
              Закрити
            </button>
          )}
        </footer>
      </Offcanvas>
    </div>
  );
};

export default FiltersOffcanvas;
