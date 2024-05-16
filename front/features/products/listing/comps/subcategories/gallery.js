import SubcategoryCard from './card'

import s from './gallery.module.scss'
import TabIndexButton from 'comps/accessibility/indexTabButton.js'

const SubcategoriesGallery = ({ subcategories }) => {
  return (
    <nav>
      <TabIndexButton
        aria-label={`Перейти до підкатегорій`}
        aria-description='Натисніть Enter, щоб перейти до галереї підкатегорій'
      >
        {subcategories && (
          <ul className={`${s.gallery} row g-3`}>
            {subcategories

              .sort((a, b) => a.order - b.order)
              .map((category) => {
                return (
                  <li key={category._id} className={`col ${s.col}`}>
                    <SubcategoryCard category={category} />
                  </li>
                )
              })}
          </ul>
        )}
      </TabIndexButton>
    </nav>
  )
}

export default SubcategoriesGallery
