import classes from "./form.module.scss";
import classNames from "classnames";
import { FormContext, FormFieldData } from "./formContext";
import {
  ChangeEvent,
  FormEvent,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import { FieldComponent, FieldProps } from "../field/field";

type FormProps<T> = {
  className?: string;
  formFields: FieldProps[];
  inputClassName?: string;
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
              <button>Save</button>
            </>
          )}
        </form>
      </FormContext.Provider>
    );
  }
);
