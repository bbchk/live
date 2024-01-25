import s from "./characteristics.module.scss";

const Characteristics = ({ product }) => {
  return (
    <>
      <div id="characteristics" className={`${s.characteristics}`}>
        <div className={`${s.splitter}`}></div>
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
