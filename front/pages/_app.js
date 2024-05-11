import 'styles/globals.scss'
import Head from 'next/head'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

// Import the styles manually to prevent a Font Awesome icon server-side rendering bug
import '@fortawesome/fontawesome-svg-core/styles.css'
// Prevent fontawesome from adding its CSS since we did it manually above
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import 'bootstrap/dist/css/bootstrap.min.css'
import '@mui/material/styles'

import { SessionProvider } from 'next-auth/react'

import { Suspense, lazy, useEffect } from 'react'

const ChangePasswordModal = lazy(
  () => import('comps/modals/change_password/change_password_modal'),
)
const SignInModal = lazy(
  () => import('comps/modals/auth/sign_in_modal/sign_in_modal'),
)
const SignUpModal = lazy(
  () => import('comps/modals/auth/sign_up_modal/sign_up_modal'),
)
const DeleteAccountModal = lazy(
  () => import('comps/modals/delete_account/delete_account_modal.js'),
)
const CartModal = lazy(() => import('comps/modals/cart/cart_modal'))
const WriteReviewModal = lazy(
  () => import('comps/modals/reviews/write_review_modal'),
)
const HotkeysModal = lazy(() => import('comps/modals/hotkeys/hotkeys.modal'))

import { LoadingOverlay } from 'comps/loading/overlay'
import Header from 'comps/layout/header/header'
const Footer = lazy(() => import('comps/layout/footer/footer'))

import { enableMapSet } from 'immer'
enableMapSet()

import { Provider, useDispatch } from 'react-redux'
import { store } from 'store/store'
import { useSelector } from 'react-redux'

import { Balsamiq_Sans } from 'next/font/google'
import { Pacifico } from 'next/font/google'
import { MainOffcanvas } from '#root/comps/layout/header/comps/offcanvas/main_offcanvas.js'

const balsamiqSans = Balsamiq_Sans({ weight: '400', subsets: ['latin'] })
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })
export { balsamiqSans, pacifico }

/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  console.log = function () {}
  console.warn = function () {}
  console.error = function () {}
}
/* eslint-enable */

import SkipToMainContent from 'comps/accessibility/skip_to_main_content'
import CustomHotkeys from 'comps/accessibility/hotkeys'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title> Живий світ: Магазин зоотоварів і товарів для дому </title>
        <meta
          name='description'
          content='Живий Світ: Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин'
        />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <CustomHotkeys />
          <SkipToMainContent mainContentId={'main_content'} />
          <Header />
          <Body>
            <Component {...pageProps} />
          </Body>

          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </Provider>
      </SessionProvider>
    </>
  )
}

const Body = ({ children }) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.modals)

  useEffect(() => {
    function handleTabUsersStyling(e) {
      if (e.key === 'Tab' && e.keyCode === 9) {
        document.body.classList.add('user-is-tabbing')
        window.removeEventListener('keydown', handleTabUsersStyling)
      }
    }

    if (window) {
      window.addEventListener('keydown', handleTabUsersStyling)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  // set global state
  useEffect(() => {
    console.log('navigated')

    //? if session set from it, else from local storage
    // const sync = useSyncWishList()
    // dispatch(wishList.set(list))
  })

  return (
    <div
      className={`${balsamiqSans.className}`}
      style={{ 'min-height': '80vh' }}
    >
      <LoadingOverlay loading={loading} />
      <MainOffcanvas />
      <Modals />
      {children}
    </div>
  )
}

function Modals() {
  const {
    signInModalOpen,
    signUpModalOpen,
    changePasswordModalOpen,
    deleteAccountModalOpen,
    cartModalOpen,
    writeReviewModalOpen,
    hotkeysModalOpen,
  } = useSelector((state) => state.modals)

  return (
    <Suspense fallback={<LoadingOverlay loading={true} />}>
      {deleteAccountModalOpen && <DeleteAccountModal />}
      {changePasswordModalOpen && <ChangePasswordModal />}
      {signInModalOpen && <SignInModal />}
      {signUpModalOpen && <SignUpModal />}
      {writeReviewModalOpen && <WriteReviewModal />}
      {cartModalOpen && <CartModal />}
      {hotkeysModalOpen && <HotkeysModal />}
    </Suspense>
  )
}
