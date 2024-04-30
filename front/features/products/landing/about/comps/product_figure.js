import { useEffect, useState } from "react";
import s from "./product_figure.module.scss";
import Image from "next/image";
import { Carousel, CarouselItem } from "/comps/carousel/carousel";
import ImageFallback from "#root/comps/image/fallback_image.js";

const ProductFigure = ({ images }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const carouselId = "ProductImagesCarousel";

  if (images?.length === 0) {
    images = ["/assets/goods_placeholder.svg"];
  }

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
              <CarouselItem
                key={`carouselProductFigureItem-${index}`}
                activeIdx={selectedImageIdx}
                index={index}
              >
                <div className={`${s.figure}`}>
                  <ImageFallback
                    src={images[index]}
                    fallbackSrc={"/assets/goods_placeholder.svg"}
                    alt="товар"
                    style={{
                      objectFit: "contain",
                      margin: "auto",
                      padding: "1rem",
                    }}
                    width={500}
                    height={500}
                    className={`${s.image}`}
                    priority
                  />
                </div>
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
                aria-current={isSelected ? "true" : "false"}
                aria-label={`Slide ${index}`}
              >
                <Image
                  src={img}
                  className={`${s.thumbnail_image}`}
                  alt={`Thumbnail ${index}`}
                  style={{
                    objectFit: "contain",
                    margin: "auto",
                    padding: "5px",
                  }}
                  width={100}
                  height={80}
                />
              </button>
            );
          })}
      </footer>
    </section>
  );
};

export default ProductFigure;
