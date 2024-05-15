import { useEffect, useState } from 'react'
import axios from 'axios'

function useFetchLikedProducts(wshl) {
  const [likedProducts, setLikedProducts] = useState([])

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (wshl?.length > 0) {
        try {
          const res = await axios.get(`/products/by-ids?ids=${wshl.join(',')}`)
          setLikedProducts(res.data)
        } catch (error) {
          // Handle error
        }
      }
    }
    fetchLikedProducts()
  }, [wshl])

  return likedProducts
}

export default useFetchLikedProducts
