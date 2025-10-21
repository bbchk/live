import Tooltip from '@mui/material/Tooltip'

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
    <Tooltip
      title={tooltipText}
      placement={placement}
      open={open}
      enterDelay={show}
      leaveDelay={hide}
      className={`cstooltip`}
      disableHoverListener={onTabOnly}
    >
      {children}
    </Tooltip>
  )
}
