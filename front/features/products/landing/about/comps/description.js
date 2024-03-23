import { useEffect, useRef, useState } from "react";
import s from "./description.module.scss";

//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";

const Description = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef();

  const toggleExpanded = () => {
    if (!expanded) {
      textRef.current.style.maxHeight = `${textRef.current.scrollHeight}px`;
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!expanded) {
      textRef.current.style.maxHeight = null;
    }
  }, [expanded]);

  useEffect(() => {
    setIsOverflowing(textRef.current.scrollHeight > 300);
  }, [product.description]);

  return (
    <>
      <div className={`${s.description}`}>
        <div
          ref={textRef}
          className={`${s.text} ${
            expanded ? s.expanded : isOverflowing ? s.fade_out : ""
          }`}
        >
          {parse(product.description)}
        </div>
        <button onClick={toggleExpanded}>
          {expanded ? (
            <>
              <p>Згорнути</p>
              <i className="bi bi-chevron-up" />
            </>
          ) : (
            <>
              <p>Читати більше</p>
              <i className="bi bi-chevron-down" />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Description;
