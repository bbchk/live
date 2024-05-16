// import useFocusOn from 'hooks/use_focus_on'
//   const focusOn() = useFocusOn()

import { useCallback } from 'react'

function useArrowKeyNavigation() {
  return useCallback((e, targets = {}) => {
    // Set default targets
    const defaultTargets = {
      ArrowDown: document.body.firstChild,
      ArrowUp: document.body.lastChild,
      Home: document.body.firstChild,
      End: document.body.lastChild,
      ...targets, // overwrite defaults with provided targets
    }

    const nextElement = defaultTargets[e.key]
    if (nextElement) {
      e.preventDefault()
      nextElement.focus()
    }
  }, []) // no dependencies, so the function is only created once
}

export default useArrowKeyNavigation
