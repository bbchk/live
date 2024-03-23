import { useState } from "react";
import s from "./product_figure.module.scss";
import Image from "next/image";

const ProductFigure = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images && images[0]);
  const isSelected = (image) => selectedImage === image;
  return (
    <section className={`${s.frame2}`}>
      <Image
        src={selectedImage}
        alt="Picture of the product"
        width={500}
        height={500}
        className={`${s.image}`}
        priority
      />
      <div className={`${s.thumbnails}`}>
        {images &&
          images.map((img, index) => (
            <div
              key={index}
              className={`${
                isSelected(img) ? s.thumbnailSelected : s.thumbnail
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                className={`${s.thumbnail_image}`}
                alt={`Thumbnail ${index}`}
                width={100}
                height={100}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductFigure;
