function getFiltersMap(products, activeCategory) {
  let filtersMap = new Map();

  for (const pd of products) {
    for (const [key, value] of pd.characteristics) {
      if (activeCategory.filters.includes(key)) {
        if (!filtersMap.has(key)) {
          filtersMap.set(key, new Set());
        }

        filtersMap.get(key).add(...value);
      }
    }
  }

  for (const [key, value] of filtersMap) {
    filtersMap.set(key, Array.from(value));
  }

  return filtersMap;
}

function getMapFromFilterStr(filtersStr) {
  const BY_FILTER_ENTRIES = ";";
  const BY_KEY_AND_VALUE = "=";
  const BY_VALUES = ",";

  let filters = null;

  if (filtersStr) {
    filters = new Map();
    filtersStr.split(BY_FILTER_ENTRIES).forEach((fs) => {
      const [filterName, filterValue] = fs.split(BY_KEY_AND_VALUE);
      filters.set(filterName, [...filterValue.split(BY_VALUES)]);
    });
  }
  return filters;
}

function intersectMaps(...maps) {
  const allKeys = Array.from(
    new Set(maps.flatMap((map) => Array.from(map.keys())))
  );

  const intersectedMap = new Map();

  allKeys.forEach((filterName) => {
    const filtersValues = maps
      .map((map) => map.get(filterName))
      .filter((value) => value !== undefined);

    const intersectedValues = intersectArrays(...filtersValues);

    if (intersectedValues.length > 0) {
      intersectedMap.set(filterName, intersectedValues);
    }
  });

  return intersectedMap;
}

function intersectArrays(...arrays) {
  const elementFrequency = {};

  for (const arr of arrays) {
    for (const element of arr) {
      elementFrequency[element] = (elementFrequency[element] || 0) + 1;
    }
  }

  const intersection = Object.keys(elementFrequency).filter(
    (element) => elementFrequency[element] === arrays.length
  );

  return intersection;
}

export { getFiltersMap, getMapFromFilterStr, intersectMaps };
