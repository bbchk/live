import React from "react";

import s from "./carousel.module.scss";

export const Carousel = ({ id, onPrev, onNext, children }) => {
  const childrenArray = React.Children.toArray(children);
  const showButtons = childrenArray.length > 1;

  return (
    <div id={id} className={`carousel slide ${s.carousel}`}>
      <div className="carousel-inner">{children}</div>
      {showButtons && (
        <>
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
          </button>
        </>
      )}
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
