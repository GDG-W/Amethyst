import { ReactNode } from "react";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type OptionProp = {
  label: string;
  value: string;
};

export type TextFieldProps = {
  type?: string;
  id?: string;
  value?: string;
  label?: string;
  extraLabel?: string;
  placeholder: string;
  width?: string;
  error?: string | ReactNode;
  helperText?: string | ReactNode;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputProps, "size">;

export interface SelectFieldProps {
  id?: string;
  placeholder: string;
  options: OptionProp[];
  extraLabel?: string;
  isMulti?: boolean;
  isLoading?: boolean;
  label?: string;
  labelStyles?: React.CSSProperties;
  isSearchable?: boolean;
  searchPlaceholder?: string;
  error?: string;
  extra?: string;
  disabled?: boolean;
  isRequired?: boolean;
  value: string;
  onChange: (value: string) => void;
  onOpen?: () => void;
  width?: string;
}

export type MultiInputFieldProps = {
  id?: string;
  label: string;
  error?: string;
  extraLabel?: string | ReactNode;
  value: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
  validate?: (val: string) => string | null;
  maxItems?: number;
};

export interface MultiSelectFieldProps extends Omit<SelectFieldProps, "value" | "onChange"> {
  value: OptionProp[];
  onChange: (value: OptionProp[]) => void;
}
