import React from "react";

import { cn } from "@/lib/utils";
import AlertIcon from "@/components/icons/alert";

import { TextFieldProps } from "../types";

const TextField = ({
  id,
  label,
  type = "text",
  extraLabel,
  placeholder,
  helperText,
  onChange,
  value,
  error,
  // required,
  ...inputProps
}: TextFieldProps) => {
  const hasError = Boolean(error);
  const hasHelper = Boolean(helperText && !error);

  const getBorderStyle = () => {
    if (hasError) return "border-red-500 focus:outline-error-base";
    if (!hasError) return "outline-information-base";
    return "border-stroke-soft-200";
  };

  const getHelperTextColor = () => {
    if (hasError) return "text-red-500";
    if (hasHelper) return "text-sub-600";
    return "";
  };

  const getHelperIconColor = () => {
    if (hasError) return "text-red-500";
    if (hasHelper) return "text-soft-400";
    return "";
  };

  const renderHelperMessage = () => {
    if (!helperText && !error) return null;

    return (
      <div className={cn("mt-1 flex items-start gap-1 tracking-tight", getHelperTextColor())}>
        <AlertIcon className={cn("h-4 w-4", getHelperIconColor())} />
        <p className='text-xs'>{hasError ? error : helperText}</p>
      </div>
    );
  };

  return (
    <div className='w-full'>
      <label htmlFor={id} className='label-3 mb-2 block font-medium tracking-tight'>
        <span className='mr-2'>{label}</span>
        {extraLabel && <span className='text-sm text-gray-500'>{extraLabel}</span>}
      </label>

      <input
        data-testid={id}
        {...inputProps}
        className={cn(
          "placeholder:text-soft-400 w-full rounded-lg border px-4 py-4 tracking-tight",
          getBorderStyle(),
          inputProps.disabled && "cursor-not-allowed bg-gray-100",
        )}
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        placeholder={placeholder}
      />

      {renderHelperMessage()}
    </div>
  );
};

export default TextField;
