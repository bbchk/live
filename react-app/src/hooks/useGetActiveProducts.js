export const useGetActiveProducts = () => {
  const getActiveProducts = (allProducts, activeCategory) => {
    const activeCategoryPath = activeCategory.path

    const activeProducts = allProducts.filter((p) => {
      const activeCategory = p.category.find((cat) =>
        cat.path.includes(activeCategoryPath),
      )
      if (activeCategory) {
        return p
      }
    })

    return activeProducts
  }

  return { getActiveProducts }
}
