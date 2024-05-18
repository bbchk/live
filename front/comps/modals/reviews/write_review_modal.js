import s from './write_review_modal.module.scss'
import ms from 'comps/modals/modal.module.scss'

import WriteReviewForm from 'features/products/landing/mutual/write_review_form/write_review_form'

import { useDispatch, useSelector } from 'react-redux'

import { balsamiqSans } from '#root/pages/_app.js'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { WRITE_REVIEW_MODAL } = GLOBAL_COMPS

//todo input validation
const WriteReviewModal = () => {
  const dispatch = useDispatch()
  const { writeReviewModalOpen } = useSelector((state) => state.modals)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={writeReviewModalOpen}
      onClose={() => dispatch(toggle(WRITE_REVIEW_MODAL))}
      fullWidth
      maxWidth='lg'
      fullScreen={fullScreen}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Написати відгук
      </DialogTitle>
      <DialogContent className={`${s.body} ${balsamiqSans.className}`}>
        <WriteReviewForm />
      </DialogContent>
    </Dialog>
  )
}

export default WriteReviewModal
