import s from "./footer.module.scss";

const Footer = () => (
  <>
    <div className={`${s.decor_line}`}></div>
    <footer className={`${s.footer_container}`}>
      <div className={`row  ${s.footer}`}>
        <div className={`col-sm-12 col-md-6 col-xl-4   ${s.about_us}`}>
          <h6>
            <i className="bi bi-info-square-fill"></i>
            <span>About us</span>
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className={`col-sm-12 col-md-6 col-xl-3 ${s.work_hours}`}>
          <h6>
            <i className="bi bi-clock-fill"></i>
            <span>Коли ми працюємо?</span>
          </h6>
          <div>
            <p>
              ⚬ Пн: з 8:00 - 17:00
              <br />
              ⚬ Вт-Пт: 8:00 - 18:00
              <br />
              ⚬ Сб: 8:00 - 16:00
              <br />⚬ Нд: Вихідний
            </p>
          </div>
        </div>

        <div className={`col-sm-12 col-md-6 col-xl-3 ${s.contacts}`}>
          <h6>
            <i className="bi bi-telephone-fill"></i>
            <span>Контакти</span>
          </h6>
          <p>⚬ Vinnytsia, Pasazhirska st. 16, 101</p>
          <p>⚬ info@example.com</p>
          <p>⚬ +380506041058</p>
        </div>

        <div className={`col-sm-12 col-md-6 col-xl-2  ${s.location}`}>
          <h6>
            <i className="bi bi-geo-alt-fill"></i>
            <span>Де нас знайти?</span>
          </h6>
          <iframe
            className={`${s.map}`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41503.63579534659!2d28.492456474575008!3d49.44714723276756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d156d2f7d8293%3A0x71c0e196b3ed0ac7!2sPoint%20of%20Invincibility!5e0!3m2!1sen!2sua!4v1686229918593!5m2!1sen!2sua"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
