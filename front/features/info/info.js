import s from "./info.module.scss";

export const Info = () => {
  return (
    <div className={`${s.info}`}>
      <section>
        <h1 className="icon-link">
          <i className="bi bi-info-square-fill"></i>
          <span>Про нас</span>
        </h1>

        <div className="container mt-3">
          <p className="fs-3">
            Магазин найкращих товарів для вашого дому, улюбленців та рослин{" "}
          </p>
        </div>
      </section>
      <section className="mt-4">
        <h1 className="icon-link">
          <i className="bi bi-clock-fill"></i>
          <span>Коли працюємо?</span>
        </h1>

        <div className="container mt-3">
          <p className="fs-3">
            ⚬ Пн-Сб: 8:00 - 18:00
            <br />⚬ Нд: 9:00 - 17:00
          </p>
        </div>
      </section>
      <section className="mt-4">
        <h1 className="icon-link">
          <i className="bi bi-telephone-fill"></i>
          <span>Адреса</span>
        </h1>
        <div className="container mt-3">
          <p className="fs-3"> М. Калинівка, вул. Вулична, 19</p>
        </div>
      </section>
      <section className="mt-4">
        <h1>
          <i className="bi bi-geo-alt-fill"></i>
          <span>Де ?</span>
        </h1>
        <iframe
          className={`${s.map}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41503.63579534659!2d28.492456474575008!3d49.44714723276756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d156d2f7d8293%3A0x71c0e196b3ed0ac7!2sPoint%20of%20Invincibility!5e0!3m2!1sen!2sua!4v1686229918593!5m2!1sen!2sua"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Info;
