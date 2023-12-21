import s from "./characteristics.module.scss";

const Characteristics = ({ product }) => {
  const { brand, weight, packing } = product;
  const characteristics = { brand, weight, packing };

  const names = ["Brand", "Weight", "Packing"];
  return (
    <>
      <div id="characteristics" className={`${s.characteristics}`}>
        <h1 className={`${s.title}`}>
          <a href="#characteristics">Characteristics:</a>
        </h1>
        <div className={`${s.splitter}`}></div>
        {Object.entries(characteristics).map(([key, value], index) => (
          <div key={key} className={`${s.item}`}>
            <span>{names[index]}: </span>
            <span className={`${s.splitter}`}></span>

            <span>{value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Characteristics;
