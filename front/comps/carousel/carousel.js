import { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import s from "./carousel.module.scss";

export const Carousel = ({ id, onPrev, onNext, children }) => {
  return (
    <div id={id} className={`carousel slide ${s.carousel}`}>
      <div className="carousel-inner">{children}</div>
      <button
        onClick={onPrev}
        className="carousel-control-prev "
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev"
      >
        <i class="bi bi-caret-left-fill" />
      </button>
      <button
        onClick={onNext}
        className="carousel-control-next text-dark"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="next"
      >
        <i class="bi bi-caret-right-fill" />
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
