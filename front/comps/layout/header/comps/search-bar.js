import { useState } from "react";
import s from "./search-bar.module.scss";
import hs from "../header.module.scss";
import { SearchRounded } from "@mui/icons-material";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    // console.log(`searching...${searchText}`);
  };

  return (
    <form
      className={`${s.search_bar} ${hs.search_bar}`}
      role="search"
      onSubmit={handleSearch}
    >
      <input
        id="search_bar_input"
        // disabled
        className={`form-control ${s.search_field}`}
        type="search"
        placeholder="шукати..."
        aria-label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className={`button_submit ${s.search_button}`}
        type="submit"
        aria-label="Здійснити пошук"
      >
        <p>знайти</p>
        <SearchRounded />
      </button>
    </form>
  );
};

export default SearchBar;
