function useFocusOn() {
  return function focusOn(id) {
    const element = document.getElementById(id)
    if (element) {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0')
      }
      element.scrollIntoView({ behavior: 'smooth' })
      element.focus()
    }
  }
}

export default useFocusOn
