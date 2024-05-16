import { useCallback } from 'react'

const DOUBLE_HEADER_HEIGHT = 200
const useScrollTo = () => {
  const scrollTo = useCallback((e) => {
    if (window) {
      // if (e.key === 'Tab' && e.keyCode === 9) {
      // if (document.activeElement === ref.current) {
      const rect = e.target.getBoundingClientRect()
      window.scrollTo({
        top:
          rect.top +
          window.scrollY +
          (e.ctrlKey ? -DOUBLE_HEADER_HEIGHT : DOUBLE_HEADER_HEIGHT),
        behavior: 'smooth',
      })
      // }
      // }
    }
  }, [])

  return scrollTo
}

export default useScrollTo
