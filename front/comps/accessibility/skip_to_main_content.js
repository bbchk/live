const SkipToMainContent = ({ mainContentId }) => {
  return (
    <a
      href={`#${mainContentId}`}
      className='sr_only visible_on_focus'
      // aria-label='Перейти до основного контенту'
    >
      Перейти до основного контенту
    </a>
  )
}

export default SkipToMainContent

//todo if element is in viewport, prevent scroll, but focus
// const handleClick = (event) => {
//   const element = document.getElementById(mainContentId)
//   const rect = element.getBoundingClientRect()
//   const isInViewport =
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   if (!isInViewport) {
//     element.scrollIntoView()
//   } else {
//     event.preventDefault()
//     // element.focus()
//   }
//   // event.target.blur()
// }
