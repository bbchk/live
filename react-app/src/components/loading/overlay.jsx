import CircularProgress from '@mui/material/CircularProgress'
import s from './overlay.module.scss'

const LoadingOverlay = ({ loading }) => {
  return (
    <div className={`${s.overlay} ${loading ? s.show : ''} `}>
      <CircularProgress
        className={s.spinner}
        size={40}
        thickness={4}
        variant='indeterminate'
      />
    </div>
  )
}

export default LoadingOverlay
