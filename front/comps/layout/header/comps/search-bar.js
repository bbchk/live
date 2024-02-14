import s from "../header.module.scss";

const SearchBar = () => {
  return (
    <form className={`${s.search_bar}`} role="search">
      <input
        className={`form-control ${s.search_field}`}
        type="search"
        placeholder="шукати..."
        aria-label="Search"
      />
      <button className={`btn ${s.search_button}`} type="submit">
        <p>знайти</p>
        <i className="bi bi-search-heart"></i>
      </button>
    </form>
  );
};

export default SearchBar;
