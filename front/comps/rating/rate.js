import { useEffect, useId, useState } from "react";
import s from "./rate.module.scss";
import StarIcon from "./star_icon";

const Rate = () => {
  const ALL_STARS = 5;
  const STARS_TEXT = ["Чудово", "Добре", "Нормально", "Так собі", "Погано"];

  const id = useId();
  const [selectedStars, setSelectedStars] = useState(5);

  useEffect(() => {
    const starValue = ALL_STARS - selectedStars;
    console.log(starValue);
  }, [selectedStars]);

  return (
    <>
      <p className="text-align-start w-100">Оцініть товар</p>
      <menu className={`${s.rate}`}>
        {Array.from({ length: ALL_STARS }, (_, i) => i + 1).map(
          (star, index) => {
            return (
              <li className={`${s.star}`}>
                <button
                  key={`${id}-${index}`}
                  onClick={() => {
                    console.log(index);
                    setSelectedStars(index);
                  }}
                >
                  <StarSvg isActive={index + 1 > selectedStars} />
                  <label>{STARS_TEXT[index]}</label>
                </button>
              </li>
            );
          }
        )}
      </menu>
    </>
  );
};
export default Rate;

const StarSvg = ({ isActive }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      className={`bi bi-star-fill ${isActive ? s.active : ""}`}
      viewBox="0 0 16 16"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.950l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
};
