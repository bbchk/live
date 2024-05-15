import s from './recs_carousel.module.scss'
import ListingProductCard from 'features/products/listing/comps/gallery/card/listing_card'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const RecsCarousel = () => {
  const router = useRouter()
  const { productId } = router.query

  const [recs, setRecs] = useState([])

  useEffect(() => {
    // const numCores = navigator.hardwareConcurrency || 4
    // console.log(`Number of cores: ${numCores}`)

    let recsWorker = new Worker('/workers/recommendations.worker.js', {
      type: 'module',
    })
    // let recsWorker = new Worker('/workers/search.worker.js', {
    //   type: 'module',
    // })

    recsWorker.postMessage({
      id: productId,
      backEndUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    })

    recsWorker.onmessage = (event) => {
      if (!event.data.error) {
        setRecs(event.data)
      }
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
