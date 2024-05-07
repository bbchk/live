import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "store/filtersSlice";

const genFiltersStr = (filters) => {
  let filtersStr = "";
  for (const key in filters) {
    filtersStr += `${key}=${filters[key].join(",")};`;
  }

  return filtersStr.slice(0, -1);
};

export const useUpdateFilters = () => {
  const router = useRouter();
  const { categoryPath, filtersStr } = router.query;

  const { filters } = useSelector((state) => state.filters);

  useEffect(() => {
    let newFiltersStr = genFiltersStr(filters);

    if (
      Object.keys(filters).length != 0 &&
      newFiltersStr !== router.query.filtersStr
    ) {
      const filtersStrPageDefault = newFiltersStr.replace(/page=\d+/, "page=1");
      router.push(`/products/${categoryPath}/${filtersStrPageDefault}`);
    }
  }, [filters, genFiltersStr, categoryPath, router]);
};
