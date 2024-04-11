import s from "./review_item.module.scss";
import StarRating from "comps/rating/star_rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faArrowTurnUp,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const ReviewItem = ({ review }) => {
  const {
    id = 1,
    starRating = 2.4,
    cons = "Немає",
    pros = "Відмінний телефон",
    comment = "0 годин роботи в інтернеті через Wi-Fi або перегляду відео». У мене вистачає ну максимум годин на 5 просмотру відео. Я розумію що 5 годин це і є «до 10 годин», але я не розумію у чому справа. Може треба повернути його, обміняти?",
    date = "01.01.2021",
    author = "Бучок Богдан",
    likes = 5,
    dislikes = 10,
    subreviews = ["Blah blah blah", "Blah blah blah", "Blah blah blah"],
  } = review;

  console.log(pros.length);

  return (
    <div className={`${s.review_item}`}>
      <header className={`${s.header}`}>
        <p>{author}</p>
        <p>{date}</p>
      </header>
      <div className={`${s.body}`}>
        <StarRating rating={starRating} />
        <p className={`${s.comment}`}>{comment}</p>
        {pros.length > 0 && (
          <p className={`${s.pros}`}>
            <span>Переваги:</span> {pros}
          </p>
        )}
        {cons.length > 0 && (
          <p className={`${s.cons}`}>
            <span>Недоліки:</span> {cons}
          </p>
        )}
      </div>

      <footer className={`${s.footer}`}>
        <button className={`${s.subreply_btn}`}>
          <FontAwesomeIcon icon={faArrowTurnUp} transform={{ rotate: 90 }} />
          <p>Відповісти</p>
        </button>
        <div className={`${s.like_btn_group}`}>
          <button className={`${s.like_btn}`}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <p>{likes}</p>
          <button className={`${s.dislike_btn}`}>
            <FontAwesomeIcon icon={faThumbsDown} transform={{ flipX: true }} />
          </button>
          <p>{dislikes}</p>
          <button className={`${s.options_btn}`}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ReviewItem;
