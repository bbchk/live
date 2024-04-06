import s from "./filters_offcanvas.module.scss";
import Offcanvas from "comps/offcanvas/offcanvas";
import OffcanvasHeader from "comps/offcanvas/offcanvas_header";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";
import FiltersAccordion from "../filters_accordion/filters_accordion";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

const FiltersOffcanvas = ({ id, filters, minMaxPrice, currentMinMaxPrice }) => {
  const router = useRouter();
  const { filters: activeFilters } = useSelector((state) => state.filters);

  return (
    <Offcanvas id={id}>
      <OffcanvasHeader id={`${id}Header`}>
        <div className={`${s.offcanvas_filter_header}`}>
          <i className="bi bi-funnel-fill" />
          <h2>Фільтри</h2>
        </div>
      </OffcanvasHeader>

      <OffcanvasBody>
        <div className={`${s.offcanvas_filter_body}`}>
          {Object.keys(activeFilters).length != 0 && (
            <button
              className={`${s.cancel_all_btn} button_danger_secondary`}
              onClick={() => {
                const categoryPath = router.query.categoryPath;
                router.push(`/products/${categoryPath}/page=1`);
              }}
            >
              Скасувати усі фільтри
            </button>
          )}

          <FiltersAccordion
            filters={filters}
            minMaxPrice={minMaxPrice}
            currentMinMaxPrice={currentMinMaxPrice}
            show={false}
          />
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default FiltersOffcanvas;
