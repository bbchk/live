import Link from 'next/link'
import Image from 'next/image'

import { pacifico } from 'pages/_app'

import hs from '../header.module.scss'

import s from './logo.module.scss'

const Logo = () => {
  return (
    <>
      <Link className={`${s.logo} ${hs.logo} ${pacifico.className}`} href='/'>
        <Image
          src={'/assets/logo.svg'}
          alt='Логотип'
          aria-label='Перейти на головну сторінку'
          width={50}
          height={50}
        />
        <p>Живий світ</p>
      </Link>
    </>
  )
}

export default Logo
