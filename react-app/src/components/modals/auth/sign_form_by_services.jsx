import s from './sign_form_by_services.module.scss'

import { useSession, signIn, signOut } from '../../contexts/AuthContext'
import Image from 'next/image'

const SignFormByServices = () => {
  const ServiceButton = ({ serviceName }) => {
    return (
      <button
        onClick={() => {
          try {
            signIn(serviceName, { redirect: false })
          } catch (e) {
            // console.log(e);
          }
        }}
        className={`button_primary ${s.service_button}`}
      >
        <Image
          src={`/assets/services/${serviceName}_icon.svg`}
          width='20'
          height='20'
          alt='service'
        />
        {serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}
      </button>
    )
  }

  return (
    <div className={`${s.by_services} `}>
      <h6 className={`text-center d-block ${s.subheading}`}>
        Увійти за допомогою
      </h6>

      <div className={`${s.button_group}`}>
        <ServiceButton serviceName={'google'} />
        <ServiceButton serviceName={'github'} />
      </div>
    </div>
  )
}

export default SignFormByServices
