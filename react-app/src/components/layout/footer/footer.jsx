import s from './footer.module.scss'

import dynamic from 'next/dynamic'
import React, { useRef } from 'react'

import useObserver from '#root/hooks/useObserver.js'

import { balsamiqSans } from 'pages/_app'

import AboutUs from './comps/about_us'
import WorkHours from './comps/work_hours'
import Contacts from './comps/contacts'

import LoadingSpinner from '#root/comps/loading/spinner.js'
const Location = dynamic(() => import('./comps/location'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
})

const Footer = () => {
  const footerRef = useRef()
  const isVisible = useObserver(footerRef)

  return (
    <footer
      ref={footerRef}
      className={` ${s.footer} ${balsamiqSans.className}`}
    >
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

        <section
          className={`col-sm-12 col-md-6 col-xl-3 `}
          tabIndex={0}
          aria-label='Знаходимось за адресою місто Калинівка, вулиця Незалежності, 47б'
        >
          <Contacts />
        </section>

        <address className={`col-sm-12 col-md-6 col-xl-2`}>
          {isVisible && <Location />}
        </address>
      </div>
    </footer>
  )
}

export default Footer
