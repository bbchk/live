import s from "./search-bar.module.scss";

const SearchBar = () => {
  return (
    <form className={`${s.search_bar_container}`} role="search">
      <input
        className={`form-control ${s.search_field}`}
        type="search"
        placeholder="Знайти..."
        aria-label="Search"
      />
      <button className={`btn ${s.search_button}`} type="submit">
        <i className="bi bi-search fs-4"></i>
      </button>
    </form>
  );
};

export default SearchBar;
