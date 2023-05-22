import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./placeholder.module.scss";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type PlaceholderProps = {
  icon?: IconProp;
  className?: string;
  title?: string;
  body?: string;
};

export const PlaceholderComponent = ({
  className,
  icon,
  title,
  body,
}: PlaceholderProps) => {
  return (
    <div className={classNames(classes.placeholder, className)}>
      {icon && <FontAwesomeIcon icon={icon} size="4x" />}
      <div>
        {title && <h2 className={classes.title}>{title}</h2>}
        {body && <p className={classes.body}>{body}</p>}
      </div>
    </div>
  );
};
