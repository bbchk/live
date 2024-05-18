import CircularProgress from '@mui/material/CircularProgress'
import s from './spinner.module.scss'

const LoadingSpinner = ({ status }) => {
  return (
    <div className={`${s.loading_overlay}`}>
      <CircularProgress
        className={s.spinner}
        size={40}
        thickness={4}
        variant='indeterminate'
      />
    </div>
  )
}

export default LoadingSpinner
