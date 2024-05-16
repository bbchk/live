import React, { useState, useRef, useEffect } from 'react'

import s from './index_tab_button.module.scss'
import useScrollTo from '#root/hooks/use_scroll_to.js'

const TabIndexButton = ({ children, ...props }) => {
  const ref = useRef()
  const [isTabbable, setIsTabbable] = useState(true)
  const scrollTo = useScrollTo()

  useEffect(() => {
    toggleTabbability(true)
  }, [])

  const toggleTabbability = (tabbable = !isTabbable) => {
    if (ref.current) {
      setIsTabbable(tabbable)

      const tabbableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (tabbable) {
        tabbableElements.forEach((el) => el.setAttribute('tabindex', '-1'))
      } else {
        tabbableElements.forEach((el) => el.setAttribute('tabindex', '0'))
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (document.activeElement === ref.current) {
        toggleTabbability()
      }
    }

    // if (event.key === 'Tab' || event.ctrlKey) {
    //   if (document.activeElement === ref.current) {
    //     // scrollTo(event)
    //   }
    // }

    // if (event.key === 'Tab' && event.ctrlKey) {
    //   // Ctrl + Tab was pressed
    //   scrollTo(event)
    // }

    if (event.key === 'Escape') {
      toggleTabbability(true)
      ref.current.focus()
    }
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsTabbable(true)
      toggleTabbability(true)
      ref.current.focus()
    }
  }

  return (
    <div
      className={`${s.focus_in_btn}`}
      ref={ref}
      tabIndex={0}
      role={props.role || 'button'}
      onKeyDown={handleKeyDown}
      onClick={handleKeyDown}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </div>
  )
}

export default TabIndexButton
