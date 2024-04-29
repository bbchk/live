import s from "./selected.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllFilters } from "store/filtersSlice";
import { useRouter } from "next/router";
import { startLoading } from "store/modalSlice.js";

const Selected = ({ productsCount }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { filters: activeFilters } = useSelector((state) => state.filters);
  const isActiveFilters = Object.keys(activeFilters).some((f) => f != "page");

  return (
    <>
      {activeFilters && isActiveFilters && (
        <div className={`${s.selected}`}>
          <p>Обрано {productsCount} товарів</p>
          <button
            className={`${s.cancel_all_btn} button_danger_secondary`}
            onClick={() => {
              dispatch(startLoading());
              dispatch(deleteAllFilters());
              router.push(`/products/${router.query.categoryPath}/page=1`);
            }}
          >
            Скасувати
          </button>
        </div>
      )}
    </>
  );
};

export default Selected;
