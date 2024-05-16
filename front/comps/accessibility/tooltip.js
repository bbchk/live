import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import s from './tooltip.module.scss'

export const CustomTooltip = ({
  children,
  tooltipText,
  placement = 'bottom',
  onTabOnly = false,
  show = 400,
  hide = 200,
  open,
}) => {
  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: show, hide: hide }}
      overlay={(props) => renderTooltip({ ...props, tooltipText, onTabOnly })}
      show={open}
    >
      {children}
    </OverlayTrigger>
  )
}

function renderTooltip({ tooltipText, onTabOnly, ...props }) {
  return (
    <Tooltip {...props} className={`tooltip ${onTabOnly ? 'on_tab_only' : ''}`}>
      {tooltipText}
    </Tooltip>
  )
}
