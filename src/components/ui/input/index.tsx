"use client";
import React, { useState, useEffect } from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type: "text" | "email";
  name: string;
  placeholder?: string;
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  helperText?: string;
};

const Input: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,

  error = false,
  success = false,
  errorMessage,
  helperText,
  onBlur,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value !== "") {
      setTouched(true);
    }
  }, [value]);

  const getBorderStyle = () => {
    if (error && touched) return "border-red-500 focus:outline-error-base";
    if (success && touched) return "border-green-500 focus:outline-green-500";
    if (!success && !error && touched) return "outline-information-base";
    return "border-stroke-soft-200";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur(e);
  };
  return (
    <div className='mb-4 w-full'>
      <label htmlFor={name} className={`block  font-medium mb-2 `}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onBlur={handleBlur}
        {...rest}
        aria-invalid={error && touched ? "true" : "false"}
        className={`w-full px-4 py-2 border rounded-sm    ${getBorderStyle()}`}
      />
      {helperText && !error && <p className='text-xs text-text-sub-600 mt-1'>{helperText}</p>}
      {error && touched && errorMessage && (
        <p className='text-xs text-red-500 mt-1'>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
