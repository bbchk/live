import s from "./reviews.module.scss";
import ps from "../landing_product_about.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReviewItem from "../../reviews/review_item";

import Link from "next/link";

import { useDispatch } from "react-redux";

import { toggleWriteReviewModal } from "store/modalSlice";
import WriteReviewForm from "../../mutual/write_review_form";
import { useRouter } from "next/router";

const Reviews = ({ reviews }) => {
  const MAX_REVIEWS_ON_ABOUT_PAGE = 3;
  const dispatch = useDispatch();

  const router = useRouter();
  const productPathNoActiveTab = router.asPath
    .split("/")
    .slice(0, -1)
    .join("/");

  const amountOfReviews = reviews.length;

  return (
    <div className={`${s.reviews}`}>
      <header className={`${s.header}`}>
        {amountOfReviews > 0 ? (
          <>
            <h2>
              Відгуки покупців
              <span>{amountOfReviews}</span>
            </h2>
            <button
              onClick={() => dispatch(toggleWriteReviewModal())}
              className={`${s.write_review_btn} button_primary`}
            >
              <p>Написати відгук</p>
              <FontAwesomeIcon icon={faPen} />
            </button>
          </>
        ) : (
          <>
            <h2>Відгуків ще немає</h2>
            <p className={`${s.appeal}`}>
              Напишіть першим, що ви думаєте про товар
              <FontAwesomeIcon icon={faArrowDown} />
            </p>
          </>
        )}
      </header>
      <div className={`${s.body}`}>
        {amountOfReviews === 0 && (
          <>
            <div className={`${s.write_review_embedded}`}>
              <WriteReviewForm></WriteReviewForm>
            </div>
          </>
        )}
        {reviews.slice(0, MAX_REVIEWS_ON_ABOUT_PAGE).map((review) => {
          return <ReviewItem key={`review-${review.id}`} review={review} />;
        })}
      </div>
      <footer className={`${s.footer}`}>
        {amountOfReviews > 0 && (
          <Link href={productPathNoActiveTab + "/reviews"}>
            <p>Подивитись усі відгуки на товар</p>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        )}
      </footer>
    </div>
  );
};

export default Reviews;
