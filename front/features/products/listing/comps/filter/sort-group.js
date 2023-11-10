import s from "./sort-group.module.scss";

const SortGroup = () => {
  return (
    <div className={`${s.filters}`}>
      <p className="p-2">Сортування:</p>
      <div className={`${s.btn_group}`}>
        <label className="btn">
          <input type="radio" name="options" id="option1" /> За популярністю
        </label>
        {/* <hr /> */}
        <label className="btn">
          <input type="radio" name="options" id="option2" /> Спочатку дешевші
        </label>
        {/* <hr /> */}
        <label className="btn">
          <input type="radio" name="options" id="option3" /> Спочатку дорожчі
        </label>
      </div>
    </div>
  );
};

export default SortGroup;
