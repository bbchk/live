import s from "./description.module.scss";
//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const Description = ({ product }) => {
  const des = DOMPurify.sanitize(product.description);

  return (
    <div id="description" className={`${s.description}`}>
      <h1 className={`${s.title}`}>
        <a href="#description">Description:</a>
      </h1>
      <div className={`${s.splitter}`}></div>

      <div className={`${s.text}`}>{parse(des)}</div>
    </div>
  );
};

export default Description;
