export const useGenFilterStr = () => {
  const genFiltersStr = (filters) => {
    console.log("filters", filters);
    let filtersStr = "";
    for (const key in filters) {
      filtersStr += `${key}=${filters[key].join(",")};`;
    }

    //delete last ';'
    return filtersStr.slice(0, -1);
  };

  return { genFiltersStr };
};
