import ms from '#root/comps/modals/auth/modal.module.scss'

import SignFormByServices from '../sign_form_by_services'
import VerticalSplitter from '../vertical_splitter'
import SignUpForm from './sign_up_form_by_credentials'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import {
  toggle as tg,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { SIGN_IN_MODAL, SIGN_UP_MODAL } = GLOBAL_COMPS

import { useSession } from 'next-auth/react'

import CustomAlert from 'comps/warnings/alert'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { balsamiqSans } from '#root/pages/_app.js'

const SignUpModal = () => {
  const dispatch = useDispatch()
  const { signUpModalOpen } = useSelector((state) => state.modals)

  const toggle = () => dispatch(tg(SIGN_UP_MODAL))
  const toggleAlternative = () => dispatch(tg(SIGN_IN_MODAL))

  const { data: session } = useSession()
  if (session) {
    return <CustomAlert text={'Ви уже авторизовані 😌'} />
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={signUpModalOpen}
      onClose={toggle}
      fullWidth
      maxWidth='md'
      fullScreen={fullScreen}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Реєстрація
      </DialogTitle>
      <DialogContent className={`${ms.body} ${balsamiqSans.className}`}>
        <div className={ms.left}>
          <SignUpForm
            toggleModal={toggle}
            toggleSignInModal={toggleAlternative}
          />
        </div>
        <div className={ms.vertical_splitter}>
          <VerticalSplitter />
        </div>
        <div className={ms.right}>
          <SignFormByServices />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignUpModal
