import 'styles/globals.scss'
import Head from 'next/head'

import axios from 'axios'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

import 'bootstrap/dist/css/bootstrap.min.css'
import '@mui/material/styles'

import { SessionProvider } from 'next-auth/react'

import { useEffect } from 'react'

import dynamic from 'next/dynamic'
const LoadingOverlay = dynamic(() => import('comps/loading/overlay'))

const lazyLoadwithFallback = (importStatement) =>
  dynamic(importStatement, { loading: () => <LoadingOverlay loading={true} /> })

const ChangePasswordModal = lazyLoadwithFallback(
  () => import('comps/modals/change_password/change_password_modal'),
)
const SignInModal = lazyLoadwithFallback(
  () => import('comps/modals/auth/sign_in_modal/sign_in_modal'),
)

const SignUpModal = lazyLoadwithFallback(
  () => import('comps/modals/auth/sign_up_modal/sign_up_modal'),
)
const DeleteAccountModal = lazyLoadwithFallback(
  () => import('comps/modals/delete_account/delete_account_modal.js'),
)
const CartModal = lazyLoadwithFallback(
  () => import('comps/modals/cart/cart_modal'),
)
const WriteReviewModal = lazyLoadwithFallback(
  () => import('comps/modals/reviews/write_review_modal'),
)
const HotkeysModal = lazyLoadwithFallback(
  () => import('comps/modals/hotkeys/hotkeys.modal'),
)

import Header from 'comps/layout/header/header'
const Footer = dynamic(() => import('comps/layout/footer/footer'))

import { enableMapSet } from 'immer'
enableMapSet()

import { Provider } from 'react-redux'
import { store } from 'store/store'
import { useSelector } from 'react-redux'

import { Balsamiq_Sans } from 'next/font/google'
import { Pacifico } from 'next/font/google'
import { MainOffcanvas } from '#root/comps/layout/header/comps/offcanvas/main_offcanvas.js'

const balsamiqSans = Balsamiq_Sans({
  weight: '400',
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'],
})
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
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

import SkipToMainContent from 'comps/accessibility/skip_to_main_content'
const CustomHotkeys = dynamic(() => import('comps/accessibility/hotkeys'))

import useOnUserTabbing from 'hooks/use_is_user_tabbing'

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
      <Header />
      <div
        className={`${balsamiqSans.className}`}
        style={{ 'min-height': '100vh' }}
      >
        <LoadingOverlay loading={loading} />
        <MainOffcanvas />
        <Modals />
        {children}
      </div>
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
  } = useSelector((state) => state.modals)

  return (
    <>
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
