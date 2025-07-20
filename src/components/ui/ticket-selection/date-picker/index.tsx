import React from "react";
import { Check } from "lucide-react";

type DateType = {
  id: string;
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
      className={`
        group relative w-full py-1 sm:py-2 px-2 sm:px-3 transition-all duration-200 
        flex flex-col items-center justify-center min-h-[60px] sm:min-h-[50px]
        ${
          isSelected
            ? "bg-[#F6B51E] text-white rounded-md"
            : isDisabled
              ? "opacity-40 cursor-not-allowed"
              : "bg-white border text-gray-900 hover:border-[#F6B51E] rounded-md"
        }
      `}
    >
      <div className='flex items-center gap-1 sm:gap-2 w-full justify-center'>
        <div className='flex flex-col items-center'>
          <div
            className={`text-xs sm:text-sm mb-0.5 ${isSelected ? "text-white" : "text-text-disabled-300"}`}
          >
            {date.dayName}
          </div>
          <div
            className={`text-lg sm:text-base md:text-lg font-medium ${isSelected ? "text-white" : "text-[#171717]"}`}
          >
            {date.day}
          </div>
        </div>

        <div className='flex items-center ml-1 sm:ml-0'>
          {isSelected && (
            <div className='bg-white rounded-full p-0.5 sm:p-1 transition-opacity duration-200'>
              <Check className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F6B51E]' />
            </div>
          )}
          {!isSelected && !isDisabled && (
            <div className='bg-[#E2E4E9] rounded-full p-0.5 sm:p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              <Check className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-white' />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

const DatePicker = ({
  mode = "single",
  selectedDates = [],
  onSelectionChange,
  className = "",
}: {
  mode?: "single" | "multiple" | "pro";
  selectedDates?: string[];
  onSelectionChange?: (selectedDates: string[]) => void;
  className?: string;
}) => {
  // Dates for Devfest 2025
  const dates = [
    { id: "tue-18", day: 18, dayName: "Tue", date: "2025-11-18" },
    { id: "wed-19", day: 19, dayName: "Wed", date: "2025-11-19" },
    { id: "thu-20", day: 20, dayName: "Thu", date: "2025-11-20" },
    { id: "fri-21", day: 21, dayName: "Fri", date: "2025-11-21" },
    { id: "sat-22", day: 22, dayName: "Sat", date: "2025-11-22" },
  ];

  const handleDateClick = (date: { id: string; dayName: string }) => {
    let newSelection = [...selectedDates];

    if (mode === "single") {
      // Single mode: only one date can be selected
      newSelection = selectedDates.includes(date.id) ? [] : [date.id];
    } else if (mode === "multiple") {
      // Multiple mode: toggle date selection
      if (selectedDates.includes(date.id)) {
        newSelection = selectedDates.filter((id) => id !== date.id);
      } else {
        newSelection.push(date.id);
      }
    } else if (mode === "pro") {
      // Pro mode: only Thursday can be selected
      if (date.dayName === "Thu") {
        newSelection = selectedDates.includes(date.id) ? [] : [date.id];
      }
    }

    onSelectionChange?.(newSelection);
  };

  const isDateDisabled = (date: { id?: string; day?: number; dayName: string; date?: string }) => {
    if (mode === "pro") {
      return date.dayName !== "Thu";
    }
    return false;
  };

  const getSelectionCount = () => {
    return selectedDates.length;
  };

  return (
    <div className={`${className}`}>
      {/* Month Header with Selection Count */}
      <div className='flex items-center justify-center gap-2 mb-4 bg-[#F7F7F7] p-2 sm:p-3 rounded-sm border border-dashed border-[#EBEBEB]'>
        <h3 className='text-sm sm:text-base font-medium text-[#5C5C5C]'>November 2025</h3>
        {selectedDates.length > 0 && (
          <div className='px-2 sm:px-3 py-1 bg-white border border-[#E2E4E9] rounded-sm text-xs sm:text-sm text-[#525866]'>
            {getSelectionCount()} Selected
          </div>
        )}
      </div>

      {/* Date Grid - Responsive grid with smaller gaps on mobile */}
      <div className='grid grid-cols-5 gap-2 sm:gap-3'>
        {dates.map((date) => (
          <DateButton
            key={date.id}
            date={date}
            isSelected={selectedDates.includes(date.id)}
            isDisabled={isDateDisabled(date)}
            onClick={handleDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
