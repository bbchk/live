import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import SubcategoryCard from "./card";

import s from "./gallery.module.scss";

const SubcategoriesGallery = ({ category, categories }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const pathString = category.path;
    //looking for subcategories of current category
    const regex = new RegExp(`${pathString}.*`, "g");
    const subcategories = categories.filter((c) => {
      return c.path.match(regex) && c.path !== pathString;
    });
    setSubcategories(subcategories);
  }, []);

  return (
    <>
      {subcategories && (
        <div className={`${s.subcategories_gallery}`}>
          {subcategories.map((cat) => {
            return (
              <div key={uuidv4()}>
                <SubcategoryCard category={cat}></SubcategoryCard>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SubcategoriesGallery;
