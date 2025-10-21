import { useEffect, useMemo, useState } from 'react'
import s from './listing.header.module.scss'
import Breadcrumbs from 'comps/navigation/breadcrumbs'
import { useRouter } from 'next/router'
import { unslugify } from '@bbuukk/slugtrans/slugify'
import { untransliterate } from '@bbuukk/slugtrans/transliterate'

const ListingHeader = ({ category }) => {
  const router = useRouter()
  const { categoryPath } = router.query

  const label = useMemo(() => {
    if (categoryPath.includes('search=')) {
      const slugQuery = categoryPath.split('search=')[1]
      const query = untransliterate(unslugify(slugQuery))
      return `Результати пошуку «${query}»`
    }
    return category?.name
  }, [categoryPath])

  return (
    <>
      <div className={`${s.listing_header}`}>
        <Breadcrumbs category={category} />
        <h1 className={`${s.label}`}>{label}</h1>
      </div>
    </>
  )
}

export default ListingHeader
