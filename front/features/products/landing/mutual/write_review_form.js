import InputField from "comps/input_fields/input_field.js";
import TextArea from "comps/input_fields/textarea.js";
import s from "./write_review_form.module.scss";
import { useEffect, useRef, useState } from "react";
import Rate from "comps/rating/rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faRotateRight, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { balsamiqSans } from "#root/pages/_app.js";
import Link from "next/link";

const WriteReviewForm = () => {
  const [review, setReview] = useState({ pros: "", cons: "", comment: "" });
  const [selectedStars, setSelectedStars] = useState(5);

  const ALL_STARS = 5;
  useEffect(() => {
    const starValue = ALL_STARS - selectedStars;
    console.log(starValue);
  }, [selectedStars]);

  const handleDelete = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    const newNames = [...selectedImageNames];
    newNames.splice(index, 1);
    setSelectedImageNames(newNames);
  };

  const handleRotate = (index) => {
    // Add your image rotation logic here
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageNames, setSelectedImageNames] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const imageFiles = Array.from(e.target.files);
      const newImageFiles = imageFiles.filter((file) => {
        return !selectedImageNames.includes(file.name);
      });

      const totalImages = selectedImages.length + newImageFiles.length;

      if (totalImages > 5) {
        alert("You cannot upload more than 5 images.");
        newImageFiles.splice(5 - selectedImages.length);
      }

      const newImageUrls = newImageFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);

      const newImageNames = newImageFiles.map((file) => file.name);
      setSelectedImageNames((prevNames) => [...prevNames, ...newImageNames]);
    }
  };

  return (
    <form className={`${s.write_review_form}`}>
      <Rate selectedStars={selectedStars} setSelectedStars={setSelectedStars} />
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
        required={true}
        value={review.comment}
        onChange={(e) => {
          setReview({ ...review, comment: e.target.value });
        }}
        placeholder=" Напишіть ваш коментар тут..."
        rows={5}
      />

      <div className={`${s.file_input_container}`}>
        <div className={`${s.appeal}`}>
          <FontAwesomeIcon icon={faImage} />
          <div className={`${s.text}`}>
            <p>Додайте фото</p>
            <p>
              Перетягніть файли сюди чи натисніть на кнопку. Додавайте до 5
              зображень у форматі .jpg, .jpeg, .png, розміром файлу до 5 МБ
            </p>
          </div>
          <label className={`${s.file_input_label}`}>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple
            />
            Додати фото
          </label>
        </div>
        {selectedImages.length > 0 && (
          <div className={`${s.loaded_images}`}>
            {selectedImages.map((image, index) => (
              <div key={index} className={`${s.image_box}`}>
                <Image
                  src={image}
                  alt={`loaded image ${index + 1}`}
                  width={100}
                  height={100}
                />
                <menu className={`${s.controls}`}>
                  <li>
                    <button type="button" onClick={() => handleDelete(index)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      disabled
                      onClick={() => handleRotate(index)}
                    >
                      <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                  </li>
                </menu>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="button_submit" onClick={() => handleSubmit()}>
        Залишити відгук
      </button>
      <p className={`${s.get_know_rules_appeal}`}>
        <span>
          Щоб ваш відгук або коментар пройшов модерацію і був опублікований,
          ознайомтеся, будь ласка, з{" "}
        </span>
        <Link className="link_primary" href="/review-write-rules">
          нашими правилами
        </Link>
      </p>
    </form>
  );
};

export default WriteReviewForm;
