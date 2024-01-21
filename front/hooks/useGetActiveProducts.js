export const useGetActiveProducts = () => {
  const getActiveProducts = (allProducts, activeCategory) => {
    const pathString = activeCategory.path;

    // const regex = new RegExp(`${pathString}.*`, "g");

    // const activeProducts = allProducts.filter((p) => {
    //   const isActive = false;
    //   p.category.map((cat) => {
    //     isActivepath.match(regex);
    //   });
    // });

    // const activeProducts = allProducts.filter((p) => {
    //   return p.category.some((cat) => {
    //     return cat.path.includes(pathString);
    //   });
    // });

    // const activeProducts = allProducts.filter((p) => {
    //   return p.category.some((cat) => {
    //     if (cat.path.includes(pathString)) {
    //       console.log(cat);
    //       return true;
    //     }
    //     return false;
    //   });
    // });

    const activeProducts = allProducts.map((p) => {
      const activeCategory = p.category.find((cat) =>
        cat.path.includes(pathString)
      );
      if (activeCategory) {
        return { ...p, activeCategory };
      }
      return p;
    });

    // category: [
    //   {
    //     _id: '657d6b203880e95d26c13428',
    //     name: 'Vet Meds',
    //     path: 'forDogs,vet meds',
    //     image: '/categories/forDogs/vet_meds.webp',
    //     __v: 0,
    //     order: 1
    //   }
    // ],

    return activeProducts;
  };

  return { getActiveProducts };
};
