import {
  DetailedHTMLProps,
  HTMLProps,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  dropDown: (dropDownProps: {
    className: string;
    closeCallback: () => void;
  }) => React.ReactNode;
};

export const DropDownComponent = ({
  className,
  toggleButtonRenderer,
  dropDown,
}: DropDownProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      setExpanded(false);
    };

    document.addEventListener("click", clickOutsideHandler);

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  const handleToggle = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, [isExpanded]);

  const closeCallback = useCallback(() => {
    buttonRef.current?.focus();
    setExpanded(false);
  }, [isExpanded, buttonRef.current, setExpanded]);

  const buttonProps = useMemo(
    () => ({
      ref: buttonRef,
      onClick: handleToggle,
      "aria-expanded": isExpanded,
    }),
    [isExpanded, handleToggle, buttonRef]
  );

  const menuProps = useMemo(
    () => ({
      className: classes.menu,
      closeCallback,
    }),
    [closeCallback, classes]
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={dropDownRef}
      className={classNames(classes.dropDown, className)}
    >
      {toggleButtonRenderer(buttonProps)}
      {isExpanded && dropDown(menuProps)}
    </div>
  );
};
