import { useEffect } from 'react'

function useOnUserTabbing(callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Tab' && e.keyCode === 9) {
        callback()
        window.removeEventListener('keydown', handleKeyDown)
      }
    }

    if (window) {
      window.addEventListener('keydown', handleKeyDown)
    }
  }, [callback]) // Re-run the effect when the callback changes
}

export default useOnUserTabbing
