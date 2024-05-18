import 'styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@mui/material/styles'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import { useEffect, useRef } from 'react'
import useOnUserTabbing from 'hooks/use_is_user_tabbing'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

import { enableMapSet } from 'immer'
enableMapSet()

import { Provider } from 'react-redux'
import { store } from 'store/store'
import { useSelector } from 'react-redux'

import { SessionProvider } from 'next-auth/react'

import LoadingOverlay from 'comps/loading/overlay'

const lazyload = (importStatement) =>
  dynamic(importStatement, { loading: () => <LoadingOverlay loading={true} /> })

const MainOffcanvas = lazyload(
  () => import('comps/modals/main_offcanvas/main_offcanvas.js'),
)

const ChangePasswordModal = lazyload(
  () => import('comps/modals/change_password/change_password_modal'),
)
const SignInModal = lazyload(
  () => import('comps/modals/auth/sign_in_modal/sign_in_modal'),
)
const SignUpModal = lazyload(
  () => import('comps/modals/auth/sign_up_modal/sign_up_modal'),
)
const DeleteAccountModal = lazyload(
  () => import('comps/modals/delete_account/delete_account_modal.js'),
)
const CartModal = lazyload(() => import('comps/modals/cart/cart_modal'))
const WriteReviewModal = lazyload(
  () => import('comps/modals/reviews/write_review_modal'),
)
const HotkeysModal = lazyload(
  () => import('comps/modals/hotkeys/hotkeys.modal'),
)

import SkipToMainContent from 'comps/accessibility/skip_to_main_content'
const CustomHotkeys = dynamic(() => import('comps/accessibility/hotkeys'))

import Header from 'comps/layout/header/header'
const Footer = dynamic(() => import('comps/layout/footer/footer'))

// import ErrorBoundary from 'utils/error_boundary'

import { Balsamiq_Sans } from 'next/font/google'
import { Pacifico } from 'next/font/google'
const balsamiqSans = Balsamiq_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Arial', 'sans-serif'],
})
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Arial', 'sans-serif'],
})
export { balsamiqSans, pacifico }

/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  console.log = function () {}
  console.warn = function () {}
  console.error = function () {}
}
/* eslint-enable */

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Живий світ: Магазин зоотоварів і товарів для дому</title>
        <meta
          name='description'
          content='Живий Світ: Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин'
        />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <Body>
            <Component {...pageProps} />
          </Body>
        </Provider>
      </SessionProvider>
    </>
  )
}

const Body = ({ children }) => {
  const { loading } = useSelector((state) => state.modals)

  useOnUserTabbing(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('user-is-tabbing')
    }
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [])

  return (
    <>
      <CustomHotkeys />
      <SkipToMainContent mainContentId={'main_content'} />
      {/* <ErrorBoundary> */}
      <Header />
      <div
        className={`${balsamiqSans.className}`}
        style={{ 'min-height': '100vh' }}
      >
        <LoadingOverlay loading={loading} />

        <Modals />
        {children}
      </div>
      {/* </ErrorBoundary> */}
      <Footer />
    </>
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
    mainOffcanvasOpen,
  } = useSelector((state) => state.modals)

  return (
    <>
      {mainOffcanvasOpen && <MainOffcanvas />}
      {deleteAccountModalOpen && <DeleteAccountModal />}
      {changePasswordModalOpen && <ChangePasswordModal />}
      {signInModalOpen && <SignInModal />}
      {signUpModalOpen && <SignUpModal />}
      {writeReviewModalOpen && <WriteReviewModal />}
      {cartModalOpen && <CartModal />}
      {hotkeysModalOpen && <HotkeysModal />}
    </>
  )
}
