import { useEffect, useState } from "react";
import SubcategoryCard from "./card";

import s from "./gallery.module.scss";

const SubcategoriesGallery = ({ category, categories }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const pathString = category.path;
    const regex = new RegExp(`${pathString}.*`, "g");
    const subcategories = categories.filter((c) => {
      return c.path.match(regex) && c.path !== pathString;
    });
    setSubcategories(subcategories);
    console.log(subcategories);
  }, []);

  return (
    <>
      {subcategories && (
        <div className={`${s.subcategories_gallery}`}>
          {subcategories.map((subcategory) => {
            return (
              <SubcategoryCard
                name={subcategory.name}
                image={subcategory.image}
              ></SubcategoryCard>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SubcategoriesGallery;
