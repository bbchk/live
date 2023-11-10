import s from "./characteristics.module.scss";

const Characteristics = ({ characteristics = {
  Value1: "fdj",
  Value2: "fdjsfh",
  Value3: "fdjsfh",
  Value4: "fdjsfh",
}}) => {
  return (
    <>
      <div className={`${s.characteristics_container}`}>
        {Object.entries(characteristics).map(([key, value]) => (
          <div key={key} className={`${s.characteristic}`}>
            <span>{key}:</span>
            <span className={`${s.splitter}`}></span>

            <span>{value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Characteristics;
