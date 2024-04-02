import { useState } from "react";

import s from "./carousel.module.scss";

export const Carousel = ({ id, onPrev, onNext, children }) => {
  return (
    <div id={id} className={`carousel slide ${s.carousel}`}>
      <div className="carousel-inner">{children}</div>
      <button
        onClick={onPrev}
        className={`carousel-control-prev ${s.prev_btn}`}
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev"
      >
        <i class="bi bi-caret-left-fill" />
      </button>
      <button
        onClick={onNext}
        className={`carousel-control-next ${s.next_btn}`}
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="next"
      >
        <i class="bi bi-caret-right-fill" />
        {/* <FontAwesomeIcon icon={faChevronRight} /> */}
      </button>
    </div>
  );
};

export const CarouselItem = ({ index, activeIdx, children }) => {
  return (
    <div className={`carousel-item ${index === activeIdx ? "active" : ""}`}>
      {children}
    </div>
  );
};
