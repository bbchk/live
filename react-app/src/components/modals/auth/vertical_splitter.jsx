import s from './vertical_spiltter.module.scss'

const VerticalSplitter = () => {
  return (
    <div className={`${s.vertical_splitter}`}>
      <div className={`${s.line}`} />
      <p>або</p>

      <div className={`${s.line}`} />
    </div>
  )
}

export default VerticalSplitter
