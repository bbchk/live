import Link from "next/link";

import { CustomTooltip } from "comps/accessibility/tooltip";

import s from "./icon_button.module.scss";

const IconButton = ({
  href = "#",
  children,
  tooltipText,
  onClick,
  ...props
}) => {
  return (
    <li onClick={onClick} tabIndex={0} {...props}>
      <CustomTooltip tooltipText={tooltipText}>
        <Link className={`${s.icon_btn}`} href={href} aria-label={tooltipText}>
          {children}
        </Link>
      </CustomTooltip>
    </li>
  );
};

export default IconButton;
