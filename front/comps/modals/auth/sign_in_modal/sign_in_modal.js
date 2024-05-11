import { Modal } from 'react-bootstrap'
import s from './sign_in_modal.module.scss'
import modal_s from '../modal.module.scss'
import VerticalSplitter from '../vertical_splitter'

import SignInFormByCredentials from './sign_in_form_by_credentials'
import SignFormByServices from '../sign_form_by_services'
import { useDispatch, useSelector } from 'react-redux'

import {
  toggle as tg,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { SIGN_IN_MODAL, SIGN_UP_MODAL } = GLOBAL_COMPS

import { useSession } from 'next-auth/react'
import useTabTrap from 'comps/accessibility/hooks/useTabbingTrap.js'
import CustomAlert from '#root/comps/warnings/alert.js'

//todo input validation
//todo make modal responsive

const SignInModal = ({ open }) => {
  const dispatch = useDispatch()
  const { signInModalOpen } = useSelector((state) => state.modals)

  const toggle = () => dispatch(tg(SIGN_IN_MODAL))
  const toggleAlternative = () => dispatch(tg(SIGN_UP_MODAL))

  useTabTrap(signInModalOpen, 'SignInModal')

  const { data: session } = useSession()
  if (session) {
    return <CustomAlert text={'Ви уже авторизовані 😌'} />
  }

  return (
    <>
      <Modal
        id='SignInModal'
        show={signInModalOpen || open}
        onHide={toggle}
        centered
        fullscreen='md-down'
        className={`${modal_s.modal}`}
      >
        <Modal.Header closeButton={true} className='modal_header_title_center'>
          <h3 className={`${modal_s.heading}`}>Вхід</h3>
        </Modal.Header>
        <Modal.Body className={`${modal_s.modal_body}`}>
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleAlternative}
          />

          <VerticalSplitter />

          <SignFormByServices />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SignInModal
