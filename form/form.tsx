import classNames from "classnames";
import {
  FormEvent,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
} from "react";
import { FieldComponent, FieldProps } from "../field/field";
import classes from "./form.module.scss";
import { FormContext, FormFieldData } from "./formContext";

type FormProps<T> = {
  className?: string;
  formFields: FieldProps[];
  inputClassName?: string;
  buttonLabel?: string;
  renderForm?: (formFields: FieldProps[]) => ReactNode;
  onSubmit?: (formData: FormData) => void;
  onEdit?: () => void;
};

export const FormComponent = forwardRef(
  <T extends FormFieldData<T>>(
    {
      className,
      formFields,
      inputClassName,
      buttonLabel = "Save",
      renderForm,
      onSubmit,
      onEdit,
    }: FormProps<T>,
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    const handleSubmit = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        onSubmit?.(formData);
      },
      [formFields]
    );

    const handleEdit = useCallback(() => {
      onEdit?.();
    }, []);

    return (
      <FormContext.Provider value={formFields}>
        <form
          onSubmit={handleSubmit}
          onChange={handleEdit}
          className={classNames(classes.form, className)}
          ref={ref}
        >
          {!!renderForm ? (
            renderForm(formFields)
          ) : (
            <>
              {formFields.map((field) => {
                const { name, ...fieldProps } = field;

                return (
                  <FieldComponent
                    inputClassName={inputClassName}
                    key={name}
                    name={name}
                    {...fieldProps}
                  />
                );
              })}
              <button className={classes.submit}>{buttonLabel}</button>
            </>
          )}
        </form>
      </FormContext.Provider>
    );
  }
);
