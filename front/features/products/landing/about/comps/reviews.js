import s from "./reviews.module.scss";
import ps from "../landing_product_about.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReviewItem from "../../reviews/review_item";

import Link from "next/link";

import { useDispatch } from "react-redux";

import { toggleWriteReviewModal } from "store/modalSlice";

const Reviews = ({ reviews }) => {
  const dispatch = useDispatch();

  const amountOfReviews = reviews.length;

  return (
    <div className={`${s.reviews}`}>
      <header className={`${s.header}`}>
        <h2>
          Відгуки покупців<span>{amountOfReviews}</span>
        </h2>
        <button
          onClick={() => dispatch(toggleWriteReviewModal())}
          className={`${s.write_review_btn} button_primary`}
        >
          <p>Написати відгук</p>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </header>
      <div className={`${s.body}`}>
        {amountOfReviews === 0 && (
          <>
            <></>
          </>
        )}
        {reviews.slice(0, 3).map((review) => {
          return <ReviewItem key={`review-${review.id}`} review={review} />;
        })}
      </div>
      <footer className={`${s.footer}`}>
        <Link href="#">
          <p>Подивитись усі відгуки на товар</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </footer>
    </div>
  );
};

export default Reviews;
