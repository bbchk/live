import ms from '#root/comps/modals/auth/modal.module.scss'

import VerticalSplitter from '../vertical_splitter'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useSession, signIn, signOut } from '../../contexts/AuthContext'

import SignInFormByCredentials from './sign_in_form_by_credentials'
import SignFormByServices from '../sign_form_by_services'

import CustomAlert from '#root/comps/warnings/alert.js'

import {
  toggle as tg,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
import { balsamiqSans } from '#root/pages/_app.js'

const { SIGN_IN_MODAL, SIGN_UP_MODAL } = GLOBAL_COMPS

const SignInModal = ({ open }) => {
  const dispatch = useDispatch()
  const { signInModalOpen } = useSelector((state) => state.modals)

  const toggle = () => dispatch(tg(SIGN_IN_MODAL))
  const toggleAlternative = () => dispatch(tg(SIGN_UP_MODAL))

  const { data: session } = useSession()

  if (session) {
    return <CustomAlert text={'Ви уже авторизовані 😌'} />
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      id='SignInModal'
      open={signInModalOpen || open}
      onClose={toggle}
      fullScreen={fullScreen}
      maxWidth='md'
      fullWidth={true}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Вхід
      </DialogTitle>
      <DialogContent className={`${ms.body}  ${balsamiqSans.className}`}>
        <div className={ms.left}>
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleAlternative}
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

export default SignInModal
