import useObserver from '#root/hooks/useObserver.js';
import { useEffect, useRef } from 'react';
import s from './location.module.scss';
import { MapRounded } from '@mui/icons-material';

const Location = () => {
  const ref = useRef();
  const isVisible = useObserver(ref);

  return (
    <address ref={ref} className={`${s.location}`}>
      <h2>
        <MapRounded />
        <span>Мапа</span>
      </h2>
      {isVisible && (
        <iframe
          title="Локація магазину на мапі"
          className={`${s.map}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2593.716387098199!2d28.521168176498765!3d49.45207717141875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d15b9e21142d3%3A0x1b47bdf2a9d1fae2!2z0JbQuNCy0LjQuSDQodCy0ZbRgg!5e0!3m2!1sen!2sua!4v1706544547382!5m2!1sen!2sua"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </address>
  );
};

export default Location;
