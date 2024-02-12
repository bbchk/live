import s from "./characteristics.module.scss";

const Characteristics = ({ title, product }) => {
  return (
    <>
      <div id="characteristics" className={`${s.characteristics}`}>
        <h2 className={`${s.title}`}>
          <a href="#characteristics">{title}</a>
        </h2>
        <div className={`${s.splitter}`} />
        {Object.entries(product.characteristics).map(([key, value], index) => (
          <div key={key} className={`${s.item}`}>
            <div className={`${s.key_container}`}>
              <span className={`${s.key}`}>{key}: </span>
              <span className={`${s.underline}`}> </span>
            </div>
            <span className={`${s.value}`}>{value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Characteristics;
