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
              <span className={`${s.char_key}`}>{key}: </span>
              <span className={`${s.underline}`}> </span>
            </div>
            <p className={`${s.value}`}>
              {value.map((v, idx) => (
                <span>
                  {v} <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Characteristics;
