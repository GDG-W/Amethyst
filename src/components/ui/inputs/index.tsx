import React from "react";

import { cn } from "@/lib/utils";
import AlertIcon from "@/components/icons/alert";
type TextFieldProps = {
  id?: string;
  label?: string;
  type?: string;
  extraLabel?: string;
  placeholder?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  error?: string;
  disabled?: boolean;
};
type ActionProps = {
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
};

const TextFieldUpdated = ({
  id,
  label,
  type = "text",
  extraLabel,
  placeholder,
  helperText,
  onChange,
  value,
  error,
  actionLabel = "Apply",
  onAction,
  actionDisabled,
  ...inputProps
}: TextFieldProps & ActionProps) => {
  const hasError = Boolean(error);
  const hasHelper = Boolean(helperText && !error);

  const getContainerBorder = () => {
    if (hasError) return "border-red-500 focus-within:ring-1 focus-within:ring-red-500";
    return ` border-stroke-soft-200 focus-within:ring-1 ${onAction ? "focus-within:ring-away-base" : "focus-within:ring-information-base"}`;
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
        <p className="text-xs">{hasError ? error : helperText}</p>
      </div>
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label-3 mb-2 block font-medium tracking-tight">
          <span className="mr-2">{label}</span>
          {extraLabel && <span className="text-sm text-gray-500">{extraLabel}</span>}
        </label>
      )}

      <div
        className={cn(
          "flex w-full items-center rounded-lg border px-3 py-2", // container visuals
          getContainerBorder(),
          inputProps.disabled && "cursor-not-allowed bg-gray-100"
        )}
      >
        <input
          data-testid={id}
          {...inputProps}
          className={cn(
            "placeholder:text-soft-400 w-full bg-transparent tracking-tight",
            "border-0 ring-0 outline-none",
            onAction ? "py-2 pr-16 pl-1" : "px-1 py-2"
          )}
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          placeholder={placeholder}
        />

        {onAction && (
          <button
            type="button"
            onClick={onAction}
            disabled={actionDisabled || inputProps.disabled}
            className={cn(
              "ml-2 shrink-0 rounded-md px-2 py-1 text-lg font-medium",
              "text-away-base hover:text-away-base/80",
              "disabled:text-disabled-300 disabled:cursor-not-allowed"
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {renderHelperMessage()}
    </div>
  );
};

export default TextFieldUpdated;
