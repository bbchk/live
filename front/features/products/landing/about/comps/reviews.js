import s from "./reviews.module.scss";
import ps from "../landing_product_about.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ReviewItem from "../../reviews/review_item";

const Reviews = ({ reviews }) => {
  const amountOfReviews = reviews.length;

  return (
    <div className={`${s.reviews}`}>
      <header className={`${s.header}`}>
        <h2>
          Відгуки покупців<span>{amountOfReviews}</span>
        </h2>
        <button
          onClick={() => {
            console.log("click");
          }}
          className={`${s.write_review_btn} button_primary`}
        >
          <p>Написати відгук</p>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </header>
      <div className={`${s.splitter}`} />
      {reviews.map((review) => {
        return <ReviewItem key={`review-${review.id}`} review={review} />;
      })}
    </div>
  );
};

export default Reviews;
