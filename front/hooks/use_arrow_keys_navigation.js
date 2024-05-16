import { useCallback } from 'react'

function useArrowKeyNavigation() {
  return useCallback((e) => {
    let nextElement
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        nextElement = e.target.parentElement.nextSibling?.firstChild
        break
      case 'ArrowUp':
        e.preventDefault()
        nextElement = e.target.parentElement.previousSibling?.firstChild
        break
      case 'Home':
        e.preventDefault()
        nextElement = e.target.parentElement.parentElement.firstChild.firstChild
        break
      case 'End':
        e.preventDefault()
        nextElement = e.target.parentElement.parentElement.lastChild.firstChild
        break
      default:
        break
    }
    nextElement?.focus()
  }, []) // no dependencies, so the function is only created once
}

export default useArrowKeyNavigation
