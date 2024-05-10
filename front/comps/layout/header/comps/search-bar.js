import { useState } from 'react'
import s from './search-bar.module.scss'
import hs from '../header.module.scss'
import { SearchRounded } from '@mui/icons-material'
import useDoOnKey from '#root/hooks/useDoOnKey.js'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    // console.log(`searching...${searchText}`);
  }

  useDoOnKey('Escape', () => document.getElementById('search_bar_input').blur())

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
