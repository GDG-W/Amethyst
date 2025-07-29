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
      <div className={cn("flex items-start gap-1 mt-1 tracking-tight", getHelperTextColor())}>
        <AlertIcon className={cn("w-4 h-4", getHelperIconColor())} />
        <p className='text-xs'>{hasError ? error : helperText}</p>
      </div>
    );
  };

  return (
    <div className='mb-4 w-full'>
      <label htmlFor={id} className='block font-medium mb-2 label-3 tracking-tight'>
        <span className='mr-2'>{label}</span>
        {extraLabel && <span className='text-sm text-gray-500'>{extraLabel}</span>}
      </label>

      <input
        data-testid={id}
        {...inputProps}
        className={cn(
          "w-full px-4 py-4 border rounded-lg tracking-tight placeholder:text-soft-400",
          getBorderStyle(),
          inputProps.disabled && "bg-gray-100 cursor-not-allowed",
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
