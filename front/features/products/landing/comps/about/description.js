import s from "./description.module.scss";
//? todo is using these libraries safe in sake of xss(cross-site-scripting)?
import parse from "html-react-parser";

const Description = ({ product }) => {
  return (
    <div id="description" className={`${s.description}`}>
      {/* <div className={`${s.splitter}`}></div> */}

      <div className={`${s.text}`}>
        {Object.entries(product.description).map(([title, chapter], index) => {
          title = index == 0 ? `<h1>${title}:</h1>` : `<br><h3>${title}:</h3>`;
          return (
            <div key={`${title}-${index}`}>{parse(`${title}${chapter}`)}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Description;
