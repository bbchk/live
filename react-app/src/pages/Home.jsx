import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

import { useStopLoading } from 'hooks/useStopLoading'
import CategoriesGallery from 'features/categories/comps/gallery'

const Home = () => {
  const [rootCategories, setRootCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useStopLoading()

  useEffect(() => {
    const fetchRootCategories = async () => {
      try {
        const res = await axios.get('/categories/root')
        setRootCategories(res.data)
      } catch (error) {
        console.error('Error fetching root categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRootCategories()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Helmet>
        <title>
          Живий Світ: товари для саду, городу та домашніх улюбленців
        </title>
        <meta
          name='description'
          content='Живий Світ: товари для саду, городу та домашніх улюбленців. Найкраще для вас у магазині Живий Світ!'
        />
      </Helmet>

      <div id='main_content' className='my-5'>
        <CategoriesGallery rootCategories={rootCategories} />
      </div>
    </>
  )
}

export default Home
