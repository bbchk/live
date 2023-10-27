import Image from "next/image";

import s from "./figure.module.scss";
const Figure = ({ imageUrl = "/content/categories/photos/dog.jpeg" }) => {
  return (
    <>
      <div className={`${s.figure}`}>
        <Image
          className={`${s.image}`}
          src={imageUrl}
          alt="Product image"
          width={100}
          height={100}
        />
      </div>
    </>
  );
};

export default Figure;
