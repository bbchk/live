import s from "../footer.module.scss";

const Location = () => {
  return (
    <div>
      <h6>
        <i className="bi bi-pin-map-fill"></i>
        <span>Мапа</span>
      </h6>
      <iframe
        className={`${s.map}`}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41503.63579534659!2d28.492456474575008!3d49.44714723276756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d156d2f7d8293%3A0x71c0e196b3ed0ac7!2sPoint%20of%20Invincibility!5e0!3m2!1sen!2sua!4v1686229918593!5m2!1sen!2sua"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Location;
