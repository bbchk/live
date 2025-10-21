import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import SubcategoryCard from './listing.subcat_card'

import s from './listing.subcat_gallery.module.scss'

const SubcategoriesGallery = ({ subcategories }) => {
  return (
    <>
      {subcategories && (
        <nav className={`${s.gallery} row g-3`}>
          {subcategories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              return (
                <li key={category._id} className={`col ${s.col}`}>
                  <SubcategoryCard category={category} />
                </li>
              )
            })}
        </nav>
      )}
    </>
  )
}

export default SubcategoriesGallery
