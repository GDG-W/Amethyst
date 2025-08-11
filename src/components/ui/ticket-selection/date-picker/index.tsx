"use client";
import React from "react";
import { Check } from "lucide-react";

type DateType = {
  day: number;
  dayName: string;
  date: string;
};

const DateButton = ({
  date,
  isSelected,
  isDisabled,
  onClick,
}: {
  date: DateType;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (date: DateType) => void;
}) => {
  return (
    <button
      onClick={() => !isDisabled && onClick(date)}
      disabled={isDisabled}
      className={`group relative flex min-h-[50px] w-full flex-col items-center justify-center px-2 py-1 transition-all duration-200 sm:px-3 sm:py-2 ${
        isSelected
          ? "rounded-md bg-[#F6B51E] text-white"
          : isDisabled
            ? "cursor-not-allowed opacity-40"
            : "rounded-md border bg-white text-gray-900 hover:border-[#F6B51E]"
      } `}
    >
      <div className="flex w-full items-center justify-center gap-1 sm:gap-2">
        <div className="flex flex-col items-center">
          <div className={`mb-0.5 text-sm ${isSelected ? "text-white" : "text-text-disabled-300"}`}>
            {date.dayName}
          </div>
          <div className={`text-base font-medium ${isSelected ? "text-white" : "text-[#171717]"}`}>
            {date.day}
          </div>
        </div>

        <div className="flex min-w-4 items-center justify-center sm:min-w-5">
          {isSelected && (
            <div className="rounded-full bg-white p-0.5 transition-opacity duration-200 sm:p-1">
              <Check className="h-2 w-2 text-[#F6B51E] sm:h-3 sm:w-3" />
            </div>
          )}
          {!isSelected && !isDisabled && (
            <div className="rounded-full bg-[#E2E4E9] p-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:p-1">
              <Check className="h-2 w-2 text-white sm:h-3 sm:w-3" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

const DatePicker = ({
  dates = [],
  selectedDates = [],
  onSelectionChange,
  className = "",
  availableDateKeys,
}: {
  dates?: DateType[];
  selectedDates?: string[];
  onSelectionChange?: (selectedDates: string[]) => void;
  className?: string;
  availableDateKeys?: Set<string>;
}) => {
  const handleDateClick = (date: DateType) => {
    const iso = date.date;
    let newSelection = [...selectedDates];
    if (selectedDates.includes(iso)) newSelection = selectedDates.filter((d) => d !== iso);
    else newSelection.push(iso);
    onSelectionChange?.(newSelection);
  };

  const isDateDisabled = (date: DateType) => {
    const isAvailable = availableDateKeys
      ? date.date
        ? availableDateKeys.has(date.date)
        : false
      : true;
    return !isAvailable;
  };

  const getSelectionCount = () => {
    return selectedDates.length;
  };

  return (
    <div className={`${className}`}>
      {/* Month Header with Selection Count */}
      <div className="mb-4 flex items-center justify-center gap-2 rounded-sm border border-dashed border-[#EBEBEB] bg-[#F7F7F7] p-2 sm:p-3">
        <h3 className="text-sm font-medium text-[#5C5C5C] sm:text-base">November 2025</h3>
        {selectedDates.length > 0 && (
          <div className="rounded-sm border border-[#E2E4E9] bg-white px-2 text-xs text-[#525866] sm:text-sm">
            {getSelectionCount()} Selected
          </div>
        )}
      </div>

      {/* Date Grid - Responsive grid with smaller gaps on mobile */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {dates.map((date) => (
          <DateButton
            key={date.day}
            date={date}
            isSelected={selectedDates.includes(date.date)}
            isDisabled={isDateDisabled(date)}
            onClick={handleDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
