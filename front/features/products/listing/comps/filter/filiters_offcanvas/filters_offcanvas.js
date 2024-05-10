import s from './filters_offcanvas.module.scss';

import FiltersAccordion from '../filters_accordion/filters_accordion';
import {
  SwipeableDrawer,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { deleteAllFilters } from 'store/slices/filters.slice';
import { startLoading } from 'store/slices/global_comps/global_comps.slice.js';
import { FilterAltRounded } from '@mui/icons-material';

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice';
const { FILTER_OFFCANVAS } = GLOBAL_COMPS;
import { balsamiqSans } from 'pages/_app';

const FiltersOffcanvas = ({ id, filters, minMaxPrice, productsCount }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filters: activeFilters } = useSelector((state) => state.filters);
  const { filterOffcanvasOpen } = useSelector((state) => state.modals);

  const isActiveFilters = Object.keys(activeFilters).some((f) => f != 'page');

  //todo add loading overlay to offcanvas
  //todo make it cancel_all_filters button rerender whole offcanvas for filters to refresh
  //todo make filterItems in filtersAccordion unique

  function handleToggle() {
    dispatch(toggle(FILTER_OFFCANVAS));
  }

  return (
    <SwipeableDrawer
      open={filterOffcanvasOpen}
      onOpen={handleToggle}
      onClose={handleToggle}
      transitionDurationk={{ appear: 250, enter: 250, exit: 250 }}
    >
      <Box sx={{ width: 350 }} role="presentation" className={`${s.offcanvas}`}>
        <AppBar position="static" className={`${s.header}`}>
          <Toolbar>
            <FilterAltRounded />

            <Typography
              variant="h6"
              className={`${balsamiqSans.className} ${s.shop_name}`}
            >
              Фільтри
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={`${s.offcanvas_filter_body}`}>
          {activeFilters && isActiveFilters && (
            <button
              className={`${s.cancel_all_btn} button_danger_secondary`}
              onClick={() => {
                dispatch(startLoading());
                dispatch(deleteAllFilters());
                router.push(`/products/${router.query.categoryPath}/page=1`);
              }}
            >
              Скасувати усі фільтри
            </button>
          )}

          <FiltersAccordion
            filters={filters}
            minMaxPrice={minMaxPrice}
            show={false}
          />
        </div>

        <footer>
          {activeFilters && isActiveFilters ? (
            <>
              <p>{`Знайдено ${productsCount} товарів`}</p>
              <button
                className="button_submit"
                type="button"
                onClick={() => {
                  dispatch(toggle(FILTER_OFFCANVAS));
                  router.push(
                    `/products/${router.query.categoryPath}/${router.query.filtersStr}`,
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
              onClick={() => {
                dispatch(toggle(FILTER_OFFCANVAS));
              }}
            >
              Закрити
            </button>
          )}
        </footer>
      </Box>
    </SwipeableDrawer>
  );
};

export default FiltersOffcanvas;
