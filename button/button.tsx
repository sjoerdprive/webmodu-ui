import classes from "./button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  className?: string;
};

export const ButtonComponent = ({ className }: ButtonProps) => {
  return <div className={classNames(classes.button, className)}></div>;
};
