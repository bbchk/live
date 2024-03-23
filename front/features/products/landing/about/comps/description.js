import s from "./description.module.scss";

//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";

const Description = ({ product }) => {
  return (
    <div id="description" className={`${s.description}`}>
      {/* <div className={`${s.splitter}`}></div> */}
      <div className={`${s.text}`}>{parse(product.description)}</div>
    </div>
  );
};

export default Description;
