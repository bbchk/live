import s from "./404.module.scss";

const NotFound = () => {
  return (
    <>
      <div className={s.not_found}>
        <h1>404</h1>
        <p>Сторінку не знайдено</p>
      </div>
    </>
  );
};

export default NotFound;
