import Link from 'next/link'

import { CustomTooltip } from 'comps/accessibility/tooltip'

import s from './icon_button.module.scss'

const IconButton = ({
  href = '#',
  children,
  tooltipText,
  onClick,
  ariaDescribedby = '',
}) => {
  return (
    <li onClick={onClick}>
      <CustomTooltip tooltipText={tooltipText}>
        <Link
          className={`${s.icon_btn}`}
          href={href}
          aria-label={tooltipText}
          aria-description={ariaDescribedby}
        >
          {children}
        </Link>
      </CustomTooltip>
    </li>
  )
}

export default IconButton
