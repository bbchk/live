import InputField from 'comps/input_fields/input_field.js';
import TextArea from 'comps/input_fields/textarea.js';
import s from './write_review_form.module.scss';
import { useEffect, useRef, useState } from 'react';
import Rate from 'comps/rating/rate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faRotateRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { balsamiqSans } from '#root/pages/_app.js';
import Link from 'next/link';
import WriteReviewFormFooter from './comps/write_review_form_footer';
import FileInput from 'comps/input_fields/file_input';
import ImageLoad from 'comps/image/image_load';

import { useDispatch, useSelector } from 'react-redux';

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice';
const { WRITE_REVIEW_MODAL } = GLOBAL_COMPS;

const WriteReviewForm = () => {
  const dispatch = useDispatch();
  const { writeReviewModal } = useSelector((state) => state.modals);

  const [review, setReview] = useState({
    selectedStars: 5,
    pros: '',
    cons: '',
    comment: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (writeReviewModal) {
      dispatch(toggle(WRITE_REVIEW_MODAL));
    }
    // console.log(review);
    // const ALL_STARS = 5;
    // const starValue = ALL_STARS - review.selectedStars;
    // console.log(starValue);
    // console.log(selectedImages);

    // console.log("Review submitted");
  };

  return (
    <form className={`${s.write_review_form}`} onSubmit={handleSubmit}>
      <Rate
        selectedStars={review.selectedStars}
        onChange={(index) => setReview({ ...review, selectedStars: index })}
      />
      <InputField
        type="text"
        id="prosInputField"
        value={review.pros}
        onChange={(e) => setReview({ ...review, pros: e.target.value })}
        label="Переваги"
      />
      <InputField
        type="text"
        id="consInputField"
        value={review.cons}
        onChange={(e) => setReview({ ...review, cons: e.target.value })}
        label="Недоліки"
      />
      <TextArea
        required={true}
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
        placeholder=" Напишіть ваш коментар тут..."
        rows={5}
      />

      <ImageLoad
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      <WriteReviewFormFooter />
    </form>
  );
};

export default WriteReviewForm;
