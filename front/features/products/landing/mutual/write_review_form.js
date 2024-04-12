import InputField from "comps/input_fields/input_field.js";
import TextArea from "comps/input_fields/textarea.js";
import s from "./write_review_form.module.scss";
import { useState } from "react";
import Rate from "comps/rating/rate";

const WriteReviewForm = () => {
  const [review, setReview] = useState({ pros: "", cons: "", comment: "" });

  return (
    <div className={`${s.write_review_form}`}>
      <Rate />
      <InputField
        type="text"
        id="prosInputField"
        value={review.pros}
        onChange={(e) => {
          setReview({ ...review, pros: e.target.value });
        }}
        label="Переваги"
      />
      <InputField
        type="text"
        id="consInputField"
        value={review.cons}
        onChange={(e) => {
          setReview({ ...review, cons: e.target.value });
        }}
        label="Недоліки"
      />
      <TextArea
        value={review.comment}
        onChange={(e) => {
          setReview({ ...review, comment: e.target.value });
        }}
        placeholder=" Напишіть ваш коментар тут..."
        rows={5}
      />
    </div>
  );
};

export default WriteReviewForm;
