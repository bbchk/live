import s from './overlay.module.scss'

export const LoadingOverlay = ({ loading }) => {
  return <div className={`${s.overlay} ${loading ? s.show : ''} `} />
}
