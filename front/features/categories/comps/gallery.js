import Card from "./card";
import s from "./gallery.module.scss";
import { useSelector } from "react-redux";

const Gallery = () => {
  const { categories } = useSelector((state) => state.categories);

  const isOneDepthCategory = (category) => category.path.split(",").length == 1;

  return (
    <>
      {categories && (
        <div id="categories" className={`${s.gallery}`}>
          <div className={`${s.header}`}>
            <h2>
              <a href="#categories">Categories</a>
            </h2>
          </div>
          <div
            className={` container row row-cols-sm-12 row-cols-lg-3 row-cols-xxl-4 ${s.body} mt-1 mx-auto g-5`}
          >
            {categories.filter(isOneDepthCategory).map((category) => {
              return (
                <div
                  key={category._id}
                  className={`col ${s.col} d-flex justify-content-center`}
                >
                  <Card category={category} />
                </div>
              );
            })}
          </div>
          <div className={`${s.decor_line} mt-5`}></div>
        </div>
      )}
    </>
  );
};

export default Gallery;
