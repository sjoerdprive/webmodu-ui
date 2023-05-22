import { ChangeEvent, HTMLProps, useCallback, useState } from "react";
import classes from "./switch.module.scss";
import classNames from "classnames";

type SwitchProps = Omit<
  HTMLProps<HTMLInputElement>,
  "className" | "onChange"
> & {
  className?: string;
  onChange?: (value: any) => void;
};

export const SwitchComponent = ({
  className,
  onChange,
  defaultChecked,
}: SwitchProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggleChecked = useCallback(() => {
    setChecked((prevState) => !prevState);
    onChange?.(checked);
  }, [checked]);

  return (
    <button
      role="checkbox"
      aria-checked={checked}
      className={classNames(
        classes.switch,
        checked && classes.checked,
        className
      )}
      onClick={toggleChecked}
    >
      <div className={classes.knob}></div>
    </button>
  );
};
