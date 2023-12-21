export const useGetFilters = (products) => {
  function getFilters() {
    const res = [];
    const filters = [
      { name: "Brands", prop: "brand" },
      { name: "Weights", prop: "weight" },
      { name: "Packings", prop: "packing" },
      { name: "Sizes", prop: "size" },
      { name: "Colors", prop: "color" },
    ];

    const createFilter = (name, property) => {
      let filter = null;
      const options = new Set(
        products
          .filter((product) => product[property])
          .map((product) => product[property])
      );

      if (options.size > 0) {
        filter = {};
        filter.name = name;
        filter.options = options;
        filter.prop = property;
      }

      return filter;
    };

    filters.forEach(({ name, prop }) => {
      const filter = createFilter(name, prop);
      if (filter) {
        res.push(filter);
      }
    });
    return res;
  }

  function getMinMaxPrice() {
    const prices = products.map((p) => Number(p.price));
    const min = prices.reduce((a, b) => Math.min(a, b), Infinity);
    const max = prices.reduce((a, b) => Math.max(a, b), -Infinity);
    return [min, max];
  }

  const [min, max] = getMinMaxPrice();
  const filters = getFilters();

  return { min, max, filters };
};
