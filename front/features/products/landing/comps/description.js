import s from "./description.module.scss";

const Description = ({
  description = "Liqui Moly Kompressorenoil — сучасне мастило, що легко тече, спеціально створене для всесезонного застосування e повітрянихпневмоінструмента",
}) => {
  return (
    <div className={`${s.description_container}`}>
      <h1 className={`${s.title}`}>Опис:</h1>
      <hr className="splitter" />
      <p className={`${s.description}`}>{description}</p>
    </div>
  );
};

export default Description;
