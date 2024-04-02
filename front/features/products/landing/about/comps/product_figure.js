import { useState } from "react";
import s from "./product_figure.module.scss";
import Image from "next/image";
import { Carousel, CarouselItem } from "/comps/carousel/carousel";

const ProductFigure = ({ images }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const carouselId = "ProductImagesCarousel";
  return (
    <section className={`${s.landing_product_figure}`}>
      <Carousel
        id={carouselId}
        onPrev={() =>
          setTimeout(
            () => setSelectedImageIdx((selectedImageIdx - 1) % images.length),
            600
          )
        }
        onNext={() =>
          setTimeout(
            () => setSelectedImageIdx((selectedImageIdx + 1) % images.length),
            600
          )
        }
      >
        {images &&
          images.map((img, index) => {
            return (
              <CarouselItem activeIdx={selectedImageIdx} index={index}>
                <Image
                  src={images[index]}
                  alt="product"
                  width={500}
                  height={500}
                  className={`${s.image}`}
                  priority
                />
              </CarouselItem>
            );
          })}
      </Carousel>

      <footer className={`${s.thumbnails}`}>
        {images &&
          images.map((img, index) => {
            const isSelected = selectedImageIdx === index;
            return (
              <button
                key={index}
                className={`${s.thumbnail} ${isSelected ? s.selected : ""}`}
                onClick={() =>
                  setTimeout(() => setSelectedImageIdx(index), 600)
                }
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide-to={index}
                class="active"
                aria-current={isSelected ? "true" : "false"}
                aria-label={`Slide ${index}`}
              >
                <Image
                  src={img}
                  className={`${s.thumbnail_image}`}
                  alt={`Thumbnail ${index}`}
                  width={100}
                  height={100}
                />
              </button>
            );
          })}
      </footer>
    </section>
  );
};

export default ProductFigure;
