import Image from 'next/image'
import s from './no_products.module.scss'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { startLoading } from 'store/slices/global_comps/global_comps.slice'
import { ArrowCircleLeftRounded, SearchOffRounded } from '@mui/icons-material'

const NoProductYet = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const goBack = (e) => {
    e.preventDefault()
    dispatch(startLoading())
    router.back()
  }

  return (
    <article className={`${s.no_products} `}>
      <figure tabIndex={0}>
        <SearchOffRounded />
        <figcaption>
          <span>Нічого не знайдено 😔</span>
        </figcaption>
      </figure>
      <p className={`${s.appeal}`} tabIndex={0}>
        Ми постійно оновлюємо наш асортимент, тому, будь ласка, поверніться
        пізніше та спробуйте ще раз 🥺
      </p>
      <Link
        href={'#'}
        onClick={goBack}
        className='link_primary'
        id='main_content'
      >
        <ArrowCircleLeftRounded />
        <p>Повернутись на попередню сторінку</p>
      </Link>
    </article>
  )
}

export default NoProductYet
