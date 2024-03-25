import s from "./info_header.module.scss";
import StarRating from "comps/rating/star_rating";

const MainInfoHeader = ({
  product: {
    name,
    reviews = ["good", "bad", "good", "bad", "good", "bad"],
    starRating = 3.7,
    code = "000000",
  },
}) => {
  return (
    <header className={`${s.header}`}>
      <h2>{name}</h2>
      <div className={`${s.sub_header}`}>
        <div className={`${s.rating}`}>
          <StarRating rating={starRating} />
          <p>{`${reviews.length} відгуків`}</p>
        </div>
        <p>{`Код: ${code}`}</p>
      </div>
    </header>
  );
};

export default MainInfoHeader;
