import { DetailedHTMLProps, HTMLProps, useCallback, useState } from "react";
import classes from "./dropDown.module.scss";
import classNames from "classnames";

type DropDownProps = {
  className?: string;
  toggleButtonRenderer: (
    buttonProps: DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  ) => React.ReactNode;
  dropDown: (dropDownProps: { className: string }) => React.ReactNode;
};

export const DropDownComponent = ({
  className,
  toggleButtonRenderer,
  dropDown,
}: DropDownProps) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, [isExpanded]);

  return (
    <div className={classNames(classes.dropDown, className)}>
      {toggleButtonRenderer({
        onClick: handleToggle,
        "aria-expanded": isExpanded,
      })}
      {isExpanded && dropDown({ className: classes.menu })}
    </div>
  );
};
