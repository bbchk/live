import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import s from './search-bar.module.scss'
import hs from '../header.module.scss'
import { SearchRounded } from '@mui/icons-material'
import useDoOnKey from '#root/hooks/useDoOnKey.js'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'
import {
  setSearchRes,
  removeSearchRes,
} from '#root/store/slices/search.slice.js'
import { useDispatch } from 'react-redux'
import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import axios from 'axios'

const SearchBar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  useDoOnKey('Escape', () => document.getElementById('search_bar_input').blur())

  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    // setIsLoading(true)
    dispatch(startLoading())

    const query = slugify(transliterate(searchText))
    console.log('🚀 ~ query:', query)
    router.push(`/products/search=${query}/page=1`)
    // router.push(`/products/dlya-kotiv/page=1`)

    // try {
    // const response = await axios.get(`products/search/${query}`)
    // const products = response.data
    // console.log('🚀 ~ products:', products)
    // dispatch(setSearchRes(products))
    // router.push(`/products/search/${searchText}`)
    // } catch (e) {
    //   console.log('🚀 ~ e:', e.response)
    // setError(e.response.data.message)
    // }
    // setIsLoading(false)
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
        placeholder='шукати...'
        aria-label='Search'
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
