import axios from 'axios'
import s from './recs_carousel.module.scss'
import ListingProductCard from 'features/products/listing/comps/gallery/card/listing_card'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

//do we need web worker for this?
const RecsCarousel = () => {
  const router = useRouter()
  const { productId } = router.query

  const [recs, setRecs] = useState([])

  useEffect(() => {
    let recsWorker = new Worker('/workers/recommendations.worker.js', {
      type: 'module',
    })

    recsWorker.postMessage({
      id: productId,
      backEndUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    })

    recsWorker.onmessage = (event) => {
      const handleData = async (data) => {
        if (!data.error) {
          const ids = data.join(',')
          const recommendations = await axios.get(`/products/by-ids?ids=${ids}`)

          setRecs(recommendations.data)
        }
      }

      handleData(event.data)
    }

    return () => {
      if (recsWorker) {
        // console.log("terminate");
        recsWorker.terminate()
      }
    }
  }, [])

  return (
    <section className={`${s.recs}`}>
      <h3>Також вас можуть зацікавити</h3>
      <div
        className={`row flex-row flex-nowrap overflow-auto ${s.scroll_container}`}
      >
        {recs &&
          recs.map((product) => (
            <div className={`${s.col}`} key={product._id}>
              <ListingProductCard product={product} />
            </div>
          ))}
      </div>
    </section>
  )
}

export default RecsCarousel
