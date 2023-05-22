import { ReactNode } from "react";
import classes from "./style.module.scss";
import classNames from "classnames";

type IconProps = {
  className?: string;
  icon: ReactNode;
  label?: ReactNode;
  hideLabel?: boolean | "mobile";

  labelPosition?: "top" | "right" | "bottom" | "left";
};

export const Icon = ({
  className,
  icon,
  label,
  hideLabel,
  labelPosition = "bottom",
}: IconProps) => {
  return (
    <div className={classNames(classes.icon, className)}>
      <div className={classNames(classes[labelPosition], classes.body)}>
        <span className={classes.iconWrapper}>{icon}</span>
        {label && !hideLabel && <span>{label}</span>}
      </div>
    </div>
  );
};
