import s from './location.module.scss'
import { MapRounded } from '@mui/icons-material'

const Location = () => {
  return (
    <div className={`${s.location}`}>
      <h2>
        <MapRounded />
        <span>Мапа</span>
      </h2>

      <iframe
        async
        title='Гугл мапа'
        aria-label='Локація магазину на гугл мапі'
        className={`${s.map}`}
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2593.716387098199!2d28.521168176498765!3d49.45207717141875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d15b9e21142d3%3A0x1b47bdf2a9d1fae2!2z0JbQuNCy0LjQuSDQodCy0ZbRgg!5e0!3m2!1sen!2sua!4v1706544547382!5m2!1sen!2sua'
        allowFullScreen={false}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
    </div>
  )
}

export default Location
