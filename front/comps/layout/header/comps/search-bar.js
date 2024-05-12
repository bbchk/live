import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import s from './search-bar.module.scss'
import hs from '../header.module.scss'
import { SearchRounded } from '@mui/icons-material'
import useDoOnKey from '#root/hooks/useDoOnKey.js'

const SearchBar = () => {
  useDoOnKey('Escape', () => document.getElementById('search_bar_input').blur())

  const [searchText, setSearchText] = useState('')
  const [searchWorker, setSearchWorker] = useState(null)

  useEffect(() => {
    let worker = new Worker('/workers/search.worker.js', {
      type: 'module',
    })
    setSearchWorker(worker)

    return () => {
      if (worker) {
        worker.terminate()
      }
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchWorker) {
      searchWorker.postMessage({ query: searchText })
      searchWorker.onmessage = (event) => {
        console.log('Search results:', event.data)
      }
    }
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
