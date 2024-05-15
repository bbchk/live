import React, { useState, useRef, useEffect } from 'react'

// import s from './filters_accordion.module.scss'

const TabIndexButton = ({ children, ...props }) => {
  const ref = useRef()
  const [isTabbable, setIsTabbable] = useState(true)

  useEffect(() => {
    setIsTabbable(!isTabbable)
    toggleTabbability()
  }, [])

  const toggleTabbability = () => {
    if (ref.current) {
      const tabbableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (isTabbable) {
        tabbableElements.forEach((el) => el.setAttribute('tabindex', '-1'))
      } else {
        tabbableElements.forEach((el) => el.setAttribute('tabindex', '0'))
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (document.activeElement === ref.current) {
        setIsTabbable(!isTabbable)
        toggleTabbability()
      }
    }
    if (event.key === 'Escape') {
      setIsTabbable(false)
      toggleTabbability()
      ref.current.focus()
    }
  }

  return (
    <div
      //   className={`${s.focus_in}`}
      ref={ref}
      tabIndex={0}
      role='button'
      onKeyDown={handleKeyDown}
      onClick={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}

export default TabIndexButton
