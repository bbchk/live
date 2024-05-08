import s from "./filters_offcanvas_toggler.module.scss";
import { useDispatch } from "react-redux";

import { toggle } from "store/slices/global_comps/global_comps.slice";
import { GLOBAL_COMPS } from "store/slices/global_comps/global_comps.slice";
const { FILTER_OFFCANVAS } = GLOBAL_COMPS;

const FiltersOffcanvasToggler = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${s.filters_offcanvas_toggler} button_primary`}
      type="button"
      onClick={() => dispatch(toggle(FILTER_OFFCANVAS))}
    >
      <p>Фільтри</p>
      <i className="bi bi-funnel" />
    </button>
  );
};

export default FiltersOffcanvasToggler;
