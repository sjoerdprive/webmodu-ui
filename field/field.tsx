import { ChangeEvent, HTMLProps, useCallback, useId, useState } from "react";
import { useForm } from "../form/formContext";
import classes from "./field.module.scss";
import classNames from "classnames";

export type FieldProps = HTMLProps<HTMLInputElement> & {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  hideLabel?: boolean;
  labelPosition?: "top" | "right" | "bottom" | "left";
  name: string;
  label?: string;
  renderCustomInput?: (fieldProps: any) => React.ReactNode;
  onChange?: (value: any) => void;
};

export const FieldComponent = ({
  className,
  labelClassName,
  inputClassName,
  labelPosition = "top",
  renderCustomInput,
  ...field
}: FieldProps) => {
  const form = useForm();
  const id = useId();

  const thisField = form.find(
    (contextField) => contextField.name === field.name
  );

  const {
    label,
    hideLabel,
    onChange,
    value: initValue = "",
    ...inputProps
  } = { ...thisField, ...field };

  const [value, setValue] = useState(initValue);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange?.(event.currentTarget.value);
  }, []);

  return (
    <div
      className={classNames(classes.field, classes[labelPosition], className)}
      key={id}
    >
      <label
        className={classNames(
          classes.label,
          hideLabel && "sr-only",
          labelClassName
        )}
        htmlFor={id}
      >
        {label}
      </label>
      {renderCustomInput ? (
        renderCustomInput({
          ...field,
          onChange: handleChange,
          value,
          id,
          className: classes.input,
        })
      ) : (
        <input
          {...inputProps}
          className={classNames(classes.input, inputClassName)}
          onChange={handleChange}
          value={value}
          id={id}
        />
      )}
    </div>
  );
};
