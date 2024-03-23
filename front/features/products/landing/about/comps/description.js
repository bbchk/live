import { useState } from "react";
import s from "./description.module.scss";

//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";

const Description = ({ product }) => {
  const [expanded, setExpanded] = useState();
  return (
    <>
      <button
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        CLIKE ME
      </button>
      <div
        id="description"
        className={`${s.description} ${expanded ? s.expanded : ""}`}
      >
        <div className={`${s.text}`}>{parse(product.description)}</div>
      </div>
    </>
  );
};

export default Description;
