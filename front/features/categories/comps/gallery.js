import { v4 as uuidv4 } from "uuid";
import Card from "./card";
import s from "./gallery.module.scss";

const Gallery = ({ categories }) => {
  return (
    <div id="categories" className={`${s.gallery_container}`}>
      <h2>
        <a href="#categories">Категорії</a>
      </h2>
      <div
        className={` container row row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 mt-1 mx-auto g-5`}
      >
        {categories &&
          categories.map((category) => {
            const key = uuidv4();
            return (
              <div key={key} className="col d-flex justify-content-center">
                <Card naming={category.name} image={category.imageUrl} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
