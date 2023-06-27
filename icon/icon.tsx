import { ReactNode, useMemo } from "react";
import classes from "./style.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  className?: string;
  icon?: ReactNode;
  faIcon?: IconProp;
  label?: ReactNode;
  hideLabel?: boolean | "mobile";

  labelPosition?: "top" | "right" | "bottom" | "left";
};

export const Icon = ({
  className,
  icon,
  faIcon,
  label,
  hideLabel,
  labelPosition = "bottom",
}: IconProps) => {
  const IconElement = useMemo(() => {
    switch (true) {
      case !!faIcon:
        return <FontAwesomeIcon icon={faIcon!} />;
      case !!icon:
        return icon;
      default:
        return;
    }
  }, [icon, faIcon]);

  return (
    <div className={classNames(classes.icon, className)}>
      <div className={classNames(classes[labelPosition], classes.body)}>
        <span className={classes.iconWrapper}>{IconElement}</span>
        {label && !hideLabel && <span className={classes.label}>{label}</span>}
      </div>
    </div>
  );
};
