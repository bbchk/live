import useFocusOn from 'hooks/use_focus_on'

const SkipToMainContent = ({ mainContentId }) => {
  const focusOn = useFocusOn()
  return (
    <button
      className='sr_only visible_on_focus'
      onClick={(e) => {
        e.preventDefault()
        focusOn(mainContentId)
      }}
      aria-label='Перейти до основного контенту'
    >
      Перейти до основного контенту
    </button>
  )
}

export default SkipToMainContent
