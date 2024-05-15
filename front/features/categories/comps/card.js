import { useDispatch } from 'react-redux'
import s from './card.module.scss'

import Link from 'next/link'

import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'

import { startLoading } from 'store/slices/global_comps/global_comps.slice.js'
import ImageFallback from 'comps/image/fallback_image.js'
import { useId, useState } from 'react'

const LAST_CATEGORY_IDX = 4
const Card = ({ category, subcategories }) => {
  const dispatch = useDispatch()
  const [tabToSubcats, setTabToSubcats] = useState(false)

  const categoryPathSlug = (path) => {
    return `/products/${slugify(transliterate(path))}/page=1`
  }

  function handleClick(e) {
    dispatch(startLoading())
  }

  const id = useId()
  const subcategoriesWithElepsis = [
    ...subcategories,
    {
      path: category.path,
      name: 'Інші категорії...',
      _id: `${id}-more`,
    },
  ]

  return (
    <div className={`${s.cat_card}`}>
      <Link
        href={categoryPathSlug(category.path)}
        onClick={() => handleClick()}
        aria-label={`${category.name} основна категорія`}
      >
        <ImageFallback
          src={category.imagePath}
          fallbackSrc={'/assets/goods_placeholder.svg'}
          alt={`Основна категорія ${category.name}`}
          width={300}
          height={150}
          sizes='(max-width: 600px) 50vw, (max-width: 768px) 20vw, (max-width: 1000px) 25vw, (max-width: 1200px) 20vw, 15vw'
          priority
        />
        <h2>{category.name}</h2>
      </Link>

      <button
        className={`${s.go_to_subcats}`}
        onClick={(e) => {
          console.log('clicked', e)
          setTabToSubcats(true)
        }}
        aria-label={`Переглянути підкатегорії ${category.name}`}
      >
        <ul
          className={`${s.subcat_list}`}
          aria-label={`Підкатегорії ${category.name}`}
        >
          {subcategoriesWithElepsis.map(({ _id, path, name }, idx) => {
            return (
              <li key={_id}>
                <Link
                  tabIndex={tabToSubcats ? 0 : -1}
                  href={categoryPathSlug(path)}
                  onClick={() => handleClick()}
                  onBlur={() => {
                    if (idx == LAST_CATEGORY_IDX) {
                      setTabToSubcats(false)
                    }
                  }}
                  aria-label={
                    path === category.path
                      ? `Переглянути більше підкатегорій ${category.name}`
                      : `${name} підкатегорія`
                  }
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </button>
    </div>
  )
}

export default Card
