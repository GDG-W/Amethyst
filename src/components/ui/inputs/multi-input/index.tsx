"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import Close from "@/components/icons/close";
import AlertIcon from "@/components/icons/alert";

import { MultiInputFieldProps } from "../types";

export default function MultiInput({
  id = "multi-input",
  label,
  extraLabel,
  value,
  error,
  onChange,
  placeholder = "Select options",
  validate,
  maxItems,
}: MultiInputFieldProps) {
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | undefined>(error);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = input.trim();

      if (!trimmed) return;

      if (maxItems !== undefined && value.length >= maxItems) {
        setErr(`Maximum ${maxItems} email(s) allowed`);
        return;
      }

      const validationError = validate?.(trimmed);
      if (validationError) {
        setErr(validationError);
        return;
      }

      if (!value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }

      setInput("");
      setErr(undefined);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const items = pasted.split(/[\s,]+/);
    let hasError = false;

    if (maxItems !== undefined && value.length + items.length > maxItems) {
      setErr(`Cannot add ${items.length} emails (max ${maxItems})`);
      return;
    }

    const newValues = items.reduce<string[]>((acc, item) => {
      const trimmed = item.trim();
      if (!trimmed) return acc;

      const validationError = validate?.(trimmed);
      if (validationError) {
        hasError = true;
        setErr(validationError);
        return acc;
      }

      if (!value.includes(trimmed) && !acc.includes(trimmed)) {
        acc.push(trimmed);
      }
      return acc;
    }, []);

    if (!hasError) setErr(undefined);
    onChange([...value, ...newValues]);
    setInput("");
  };

  const handleRemove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  const displayError = err || error;

  return (
    <div className="flex min-w-[400px] flex-col gap-2" data-testid="multi-input-container">
      {label && (
        <label htmlFor={id} className="label-3 block font-medium tracking-tight">
          <span className="mr-2">{label}</span>
          {extraLabel && <span className="text-sm text-gray-500">{extraLabel}</span>}
        </label>
      )}
      <div className="w-full">
        <div
          className={cn(
            "flex max-h-[100px] w-full flex-wrap items-center gap-2 overflow-scroll rounded-[8px] border px-4 py-3.5 text-base tracking-tight",
            err ? "border-red-500" : "border-soft-200"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((item) => (
            <span
              key={item}
              className="text-strong-950 bg-away-lighter flex items-center gap-1 rounded-full px-2 py-1.5 text-xs"
            >
              {item}
              <button type="button" onClick={() => handleRemove(item)}>
                <span className="sr-only">close</span>
                <Close className="h-4 w-4" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="placeholder:text-soft-400 flex-1 bg-transparent outline-none"
            placeholder={placeholder}
          />
        </div>

        {displayError && (
          <div
            className={"mt-1 flex items-start gap-1 tracking-tight text-red-500"}
            data-testid="error-message"
          >
            <AlertIcon className={"h-4 w-4 text-red-500"} />
            <p className="text-xs">{displayError}</p>
          </div>
        )}
      </div>
    </div>
  );
}
