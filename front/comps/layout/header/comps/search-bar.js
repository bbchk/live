import { useRouter } from 'next/router'
import { useState, useEffect, use } from 'react'
import s from './search-bar.module.scss'
import hs from '../header.module.scss'
import { SearchRounded } from '@mui/icons-material'
import useDoOnKey from '#root/hooks/useDoOnKey.js'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'
// import {
//   setSearchRes,
//   removeSearchRes,
// } from '#root/store/slices/search.slice.js'
import { useDispatch } from 'react-redux'
import { slugify, unslugify } from '@bbuukk/slugtrans/slugify'
import { transliterate, untransliterate } from '@bbuukk/slugtrans/transliterate'

const SearchBar = () => {
  const router = useRouter()
  const { categoryPath } = router.query
  const dispatch = useDispatch()
  useDoOnKey('Escape', () => document.getElementById('search_bar_input').blur())

  useEffect(() => {
    const isSearchPage = categoryPath?.includes('search=')
    if (isSearchPage) {
      const slugQuery = categoryPath.split('search=')[1]
      const query = untransliterate(unslugify(slugQuery))
      setSearchText(query)
    } else {
      setSearchText('')
    }
  }, [categoryPath])

  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    // setIsLoading(true)
    dispatch(startLoading())
    const query = slugify(transliterate(searchText))
    router.push(`/products/search=${query}/page=1`)
  }

  return (
    <form
      className={`${s.search_bar} ${hs.search_bar}`}
      role='search'
      onSubmit={handleSearch}
    >
      <input
        id='search_bar_input'
        className={` ${s.search_field}`}
        type='search'
        placeholder='я хочу знайти...'
        aria-label='Пошукова стрічка'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        disabled={isLoading}
      />
      <button
        className={`button_submit ${s.search_button}`}
        type='submit'
        aria-label='Здійснити пошук'
      >
        <p>знайти</p>
        <SearchRounded />
      </button>
    </form>
  )
}

export default SearchBar
