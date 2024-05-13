import s from './footer.module.scss'
import AboutUs from './comps/about_us'
import WorkHours from './comps/work_hours'
import Contacts from './comps/contacts'
import Location from './comps/location'
import { balsamiqSans } from 'pages/_app'

const Footer = () => {
  return (
    <footer className={` ${s.footer} ${balsamiqSans.className}`}>
      <div className={`${s.decor_line}`} />
      <div className={`row ${s.row}`}>
        <section
          className={`col-sm-12 col-md-6 col-xl-4 `}
          tabIndex={0}
          aria-label='Ми - магазин найкращих товарів для вашого дому, улюбленців та рослин'
        >
          <AboutUs />
        </section>

        <section
          className={`col-sm-12 col-md-6 col-xl-3 `}
          tabIndex={0}
          aria-label='Працюємо весь тиждень з 8:00 до 18:00'
        >
          <WorkHours />
        </section>

        <address
          className={`col-sm-12 col-md-6 col-xl-3 `}
          tabIndex={0}
          aria-label='Знаходимось за адресою місто Калинівка, вулиця Незалежності, 47б'
        >
          <Contacts />
        </address>

        <address
          className={`col-sm-12 col-md-6 col-xl-2`}
          tabIndex={0}
          aria-label='Локація магазину на мапі'
        >
          <Location />
        </address>
      </div>
    </footer>
  )
}

export default Footer
