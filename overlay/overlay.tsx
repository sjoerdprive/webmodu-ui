import { COLOR_SCHEME } from "app/src/constants/theming";
import classes from "./overlay.module.scss";
import classNames from "classnames";

type OverlayProps = {
  className?: string;
  children?: React.ReactNode;
  bg?: COLOR_SCHEME;
  visible?: boolean;
  showOnHover?: boolean;
};

export const OverlayComponent = ({
  className,
  children,
  bg,
  visible,
  showOnHover,
}: OverlayProps) => {
  return (
    <div
      className={classNames(
        classes.overlay,
        className,
        visible && classes.visible,

        showOnHover && classes.showOnHover
      )}
    >
      <div className={classNames(classes.backdrop, bg && `bg-${bg}`)} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};
