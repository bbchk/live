export const useGetSubcategoriesOf = () => {
  const getSubcategoriesOf = (category, allCategories) => {
    const pathString = category.path
    const regex = new RegExp(`^${pathString},[^,]+$`)
    const subcategories = allCategories.filter((c) => {
      return c.path.match(regex) && c.path !== pathString
    })
    return subcategories
  }

  return { getSubcategoriesOf }
}
