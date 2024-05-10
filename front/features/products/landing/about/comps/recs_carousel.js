import s from './recs_carousel.module.scss';
import ListingProductCard from 'features/products/listing/comps/gallery/card/listing_card';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const RecsCarousel = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [recs, setRecs] = useState([]);

  useEffect(() => {
    let recsWorker = new Worker('/recsWorker.js');
    recsWorker.postMessage({ id: productId });
    recsWorker.onmessage = (event) => {
      console.log('🚀 ~ event:', event);
      setRecs(event.data);
    };

    return () => {
      if (recsWorker) {
        // console.log("terminate");
        recsWorker.terminate();
      }
    };
  }, []);
  1;
  return (
    <section className={`${s.recs}`}>
      <h3>Також вас можуть зацікавити</h3>
      <div
        className={`row flex-row flex-nowrap overflow-auto ${s.scroll_container}`}
      >
        {recs.map((product) => (
          <div className={`${s.col}`} key={product._id}>
            <ListingProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecsCarousel;
