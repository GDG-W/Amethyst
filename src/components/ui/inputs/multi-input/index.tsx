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
}: MultiInputFieldProps) {
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | undefined>(error);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = input.trim();

      if (!trimmed) return;

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

  return (
    <div className='flex flex-col gap-2 min-w-[400px]' data-testid='multi-input-container'>
      {label && (
        <label htmlFor={id} className='block font-medium label-3 tracking-tight'>
          <span className='mr-2'>{label}</span>
          {extraLabel && <span className='text-sm text-gray-500'>{extraLabel}</span>}
        </label>
      )}
      <div className='w-full'>
        <div
          className={cn(
            "w-full flex flex-wrap items-center gap-2 border rounded-[8px] text-base tracking-tight px-4 py-3.5 max-h-[100px] overflow-scroll",
            err ? "border-red-500" : "border-soft-200",
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((item) => (
            <span
              key={item}
              className='flex items-center gap-1 text-strong-950 bg-away-lighter px-2 py-1.5 rounded-full text-xs'
            >
              {item}
              <button type='button' onClick={() => handleRemove(item)}>
                <span className='sr-only'>close</span>
                <Close className='w-4 h-4' />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className='flex-1 bg-transparent outline-none placeholder:text-soft-400'
            placeholder={placeholder}
          />
        </div>

        {err && (
          <div
            className={"flex items-start gap-1 mt-1 tracking-tight text-red-500"}
            data-testid='error-message'
          >
            <AlertIcon className={"w-4 h-4 text-red-500"} />
            <p className='text-xs'>{err}</p>
          </div>
        )}
      </div>
    </div>
  );
}
