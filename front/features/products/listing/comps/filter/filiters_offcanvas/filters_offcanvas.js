import s from "./filters_offcanvas.module.scss";
import Offcanvas from "comps/offcanvas/offcanvas";
import OffcanvasHeader from "comps/offcanvas/offcanvas_header";
import OffcanvasBody from "comps/offcanvas/offcanvas_body";
import FiltersAccordion from "../filters_accordion/filters_accordion";
import { SwipeableDrawer, Box } from "@mui/material";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteAllFilters } from "store/filtersSlice";
import { startLoading } from "store/modalSlice.js";

import { toggleFilterOffcanvas } from "store/modalSlice";

const FiltersOffcanvas = ({ id, filters, minMaxPrice, productsCount }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filters: activeFilters } = useSelector((state) => state.filters);
  const { filterOffcanvasOpen } = useSelector((state) => state.modals);

  const isActiveFilters = Object.keys(activeFilters).some((f) => f != "page");

  //todo add loading overlay to offcanvas
  //todo make it cancel_all_filters button rerender whole offcanvas for filters to refresh
  //todo make filterItems in filtersAccordion unique

  function handleToggle() {
    dispatch(toggleFilterOffcanvas());
  }

  return (
    <div className={`${s.offcanvas}`}>
      <SwipeableDrawer
        open={filterOffcanvasOpen}
        onOpen={handleToggle}
        onClose={handleToggle}
        transitionDurationk={{ appear: 250, enter: 250, exit: 250 }}
      >
        <Box sx={{ width: 350 }} role="presentation">
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
                    dispatch(startLoading());
                    dispatch(deleteAllFilters());
                    router.push(
                      `/products/${router.query.categoryPath}/page=1`
                    );
                  }}
                >
                  Скасувати усі фільтри
                </button>
              )}

              <FiltersAccordion
                id="filtersOffcanvasAccordion"
                filters={filters}
                minMaxPrice={minMaxPrice}
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
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default FiltersOffcanvas;
