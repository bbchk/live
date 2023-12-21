import s from "./description.module.scss";

const Description = ({ product }) => {
  // Split the description into paragraphs at each '\n'
  const paragraphs = product.description.split("\n");
  console.log(paragraphs);

  return (
    <div id="description" className={`${s.description}`}>
      <h1 className={`${s.title}`}>
        <a href="#description">Description:</a>
      </h1>
      <div className={`${s.splitter}`}></div>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={`${s.text}`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Description;
