import { useCallback } from 'react'

function useArrowKeyNavigation() {
  return useCallback((e, targets = {}) => {
    // Set default targets
    const defaultTargets = {
      ArrowDown: document.body.firstChild,
      ArrowUp: document.body.lastChild,
      Home: document.body.firstChild,
      End: document.body.lastChild,
      ...targets,
    }

    const nextElement = defaultTargets[e.key]
    if (nextElement) {
      e.preventDefault()
      nextElement.focus()
    }
  }, [])
}

export default useArrowKeyNavigation
