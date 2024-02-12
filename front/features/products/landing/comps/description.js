import s from "./description.module.scss";
//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const Description = ({ product }) => {
  return (
    <div id="description" className={`${s.description}`}>
      {/* <div className={`${s.splitter}`}></div> */}

      <div className={`${s.text}`}>
        {Object.entries(product.description).map(([title, chapter], index) => {
          title =
            index == 0
              ? `<h1><strong>${title}:</strong></h1>`
              : `<br><h3><strong>${title}:</strong></h3>`;
          return (
            <div key={`${title}-${index}`}>
              {parse(`${title}${DOMPurify.sanitize(chapter)}`)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Description;
