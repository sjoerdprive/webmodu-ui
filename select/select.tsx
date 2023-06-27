import { useCallback, useState } from "react";
import { List } from "..";
import { DropDownComponent } from "../dropDown/dropDown";
import classes from "./select.module.scss";
import classNames from "classnames";

type Option = {
  label: string;
  value: any;
};

type SelectProps = {
  className?: string;
  value?: any;
  listClassName?: string;
  buttonClassName?: string;
  options: Option[];
  onSelect?: (value: any) => void;
};

export const SelectComponent = ({
  className,
  value,
  options,
  listClassName,
  buttonClassName,
  onSelect,
}: SelectProps) => {
  const optionFromValue = useCallback((value: any) => {
    return options.find((option) => option.value === value);
  }, []);

  const handleSelect = useCallback(
    (selection: Option) => {
      onSelect?.(selection.value);
    },
    [onSelect]
  );

  return (
    <DropDownComponent
      className={classNames(classes.select, className)}
      toggleButtonRenderer={(buttonProps) => (
        <button
          {...buttonProps}
          className={classNames(classes.publishButton, buttonClassName)}
        >
          {optionFromValue(value)?.label}
        </button>
      )}
      dropDown={({ closeCallback, ...dropDownProps }) => (
        <List
          className={classNames(
            classes.contextMenu,
            listClassName,
            dropDownProps.className
          )}
          data={options}
          itemRenderer={(item) => (
            <button
              onClick={() => {
                closeCallback();
                handleSelect(item);
              }}
              className={classes.listButton}
            >
              {item.label}
            </button>
          )}
        />
      )}
    />
  );
};
