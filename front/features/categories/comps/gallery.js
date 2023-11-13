import { v4 as uuidv4 } from "uuid";
import Card from "./card";
import s from "./gallery.module.scss";
import { useCategoryContext } from "root/hooks/useCategoryContext";

const Gallery = () => {
  const { categories } = useCategoryContext();

  return (
    <div id="categories" className={`${s.gallery_container}`}>
      {/* <div className={`${s.decor_line} mb-5`}></div> */}
      <div className={`${s.heading}`}>
        <h2>
          <a href="#categories">Categories</a>
        </h2>
      </div>
      <div
        className={` container row row-cols-sm-12 row-cols-lg-3 row-cols-xxl-4 mt-1 mx-auto g-5`}
      >
        {categories &&
          categories
            .filter((category) => category.path.split(",").length == 1)
            .map((category) => {
              const key = uuidv4();
              return (
                <div key={key} className="col d-flex justify-content-center">
                  <Card category={category} />
                </div>
              );
            })}
      </div>
      <div className={`${s.decor_line} mt-5`}></div>
    </div>
  );
};

export default Gallery;
