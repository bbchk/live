import s from "./filters_offcanvas_toggler.module.scss";
import { useDispatch } from "react-redux";
import { toggleFilterOffcanvas } from "store/modalSlice";

const FiltersOffcanvasToggler = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${s.filters_offcanvas_toggler} button_primary`}
      type="button"
      onClick={() => dispatch(toggleFilterOffcanvas())}
    >
      <p>Фільтри</p>
      <i className="bi bi-funnel" />
    </button>
  );
};

export default FiltersOffcanvasToggler;
