import { InputHTMLAttributes, createContext, useContext } from "react";

import { FieldProps } from "../field/field";

export type FormFieldData<T> = Record<keyof T, FieldProps>;

export const FormContext = createContext<FieldProps[]>([]);

export const useForm = () => useContext(FormContext);
