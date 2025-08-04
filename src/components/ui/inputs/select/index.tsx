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
    <div className='flex flex-col gap-2 min-w-[400px]'>
      {label && (
        <label htmlFor={id} className='block font-medium label-3 tracking-tight'>
          <span className='mr-2'>{label}</span>
          {extraLabel && <span className='text-sm text-gray-500'>{extraLabel}</span>}
        </label>
      )}
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          id={id}
          aria-labelledby={id}
          className='inline-flex items-center justify-between p-4 bg-white border border-soft-200 rounded-[8px] tracking-tight data-[placeholder]:text-soft-400'
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDown className='w-4 h-4 text-sub-600' />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className='overflow-hidden bg-white border-[0.25px] border-sub-300 rounded-md shadow-lg mt-16'>
            <Select.Viewport className=''>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 outline-none tracking-tight text-strong-950 hover:bg-away-lighter cursor-pointer",
                  )}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className='w-4 h-4 text-sub-600' />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && (
        <div className={"flex items-start gap-1 mt-1 tracking-tight text-red-500"}>
          <AlertIcon className={"w-4 h-4 text-red-500"} />
          <p className='text-xs'>{error}</p>
        </div>
      )}
    </div>
  );
}

SelectField.displayName = "Select";
