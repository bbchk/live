import s from './listing_header.module.scss'
import Breadcrumbs from 'comps/navigation/breadcrumbs'

const ListingHeader = ({ category }) => {
  return (
    <>
      <div className={`${s.listing_header}`}>
        <Breadcrumbs category={category} />
        <h2 className={`${s.category_label}`}>{category.name}</h2>
      </div>
    </>
  )
}

export default ListingHeader
