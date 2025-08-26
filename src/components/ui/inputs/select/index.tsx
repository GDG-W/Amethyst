"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import AlertIcon from "@/components/icons/alert";

import { SelectFieldProps } from "../types";

export default function SelectField({
  label,
  extraLabel,
  options,
  value,
  onChange,
  error,
  placeholder = "Select an option",
  id = "select-field",
}: SelectFieldProps) {
  return (
    <div className="flex w-full min-w-[200px] flex-col gap-2">
      {label && (
        <label htmlFor={id} className="label-3 block font-medium tracking-tight">
          <span className="mr-2">{label}</span>
          {extraLabel && <span className="text-sm text-gray-500">{extraLabel}</span>}
        </label>
      )}
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          id={id}
          aria-labelledby={id}
          className="border-soft-200 data-[placeholder]:text-soft-400 inline-flex items-center justify-between rounded-[8px] border bg-white p-4 tracking-tight"
        >
          <Select.Value placeholder={placeholder} className="!text-left" />
          <Select.Icon>
            <ChevronDown className="text-sub-600 h-4 w-4" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="border-sub-300 mt-16 overflow-hidden rounded-md border-[0.25px] bg-white shadow-lg">
            <Select.Viewport className="">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "text-strong-950 hover:bg-away-lighter flex cursor-pointer items-center justify-between px-3.5 py-2.5 tracking-tight outline-none"
                  )}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="text-sub-600 h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && (
        <div className={"mt-1 flex items-start gap-1 tracking-tight text-red-500"}>
          <AlertIcon className={"h-4 w-4 text-red-500"} />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}

SelectField.displayName = "Select";
