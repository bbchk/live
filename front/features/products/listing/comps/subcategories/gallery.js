import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubcategoryCard from "./card";

import s from "./gallery.module.scss";

const SubcategoriesGallery = ({ category }) => {
  const { categories } = useSelector((state) => state.categories);

  const [subcategories, setSubcategories] = useState([]);

  //todo unefficient
  useEffect(() => {
    const pathString = category.path;
    //looking for subcategories of current category
    const regex = new RegExp(`^${pathString},[^,]+$`);
    const subcategories = categories.filter((c) => {
      return c.path.match(regex) && c.path !== pathString;
    });
    setSubcategories(subcategories);
  }, []);

  return (
    <>
      {subcategories && (
        <div
          className={`${s.subcategories_gallery}  container row  mx-auto gy-5`}
        >
          {subcategories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              return (
                <div
                  key={category._id}
                  className={`col col-12 col-sm-6 col-md-4 col-lg-3 ${s.col_xl_1_5}`}
                >
                  <SubcategoryCard category={category} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SubcategoriesGallery;
