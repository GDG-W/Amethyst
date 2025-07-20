"use client";
import React, { useState } from "react";

import Card from "@/components/ui/ticket-selection/ticket-card";
import Tabs from "@/components/ui/ticket-selection/ticket-tabs";
import DatePicker from "@/components/ui/ticket-selection/date-picker";

const TicketsSelection = () => {
  const [activeTab, setActiveTab] = useState<"single" | "multiple" | "pro">("single");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const tabsData = [
    { id: "single", label: "Single Ticket" },
    { id: "multiple", label: "Multiple Ticket" },
    { id: "pro", label: "Pro Ticket" },
  ];

  const header = (
    <>
      <div className='w-8 h-8 bg-[#171717] rounded-sm flex items-center justify-center text-white font-semibold text-sm'>
        1
      </div>
      <h2 className='text-base font-medium text-black'>Select Date(s)</h2>
    </>
  );

  const handleTabChange = (tabId: string) => {
    const newTab = tabId as "single" | "multiple" | "pro";
    // Only clear selected dates when switching to a different tab
    if (newTab !== activeTab) {
      setSelectedDates([]);
    }
    setActiveTab(newTab);
  };

  const handleDateSelectionChange = (dates: string[]) => {
    setSelectedDates(dates);
  };

  return (
    <div className='bg-bg-strong-950 p-4 max-w-md mx-auto'>
      <Card header={header} className='bg-bg-strong-950 border border-bg-surface-800 rounded-lg'>
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className='bg-[#F7F7F7] px-2 md:px-3 py-2 flex gap-1'
        />

        <div className='mt-6'>
          <DatePicker
            mode={activeTab}
            selectedDates={selectedDates}
            onSelectionChange={handleDateSelectionChange}
            className='w-full'
          />
        </div>
      </Card>
    </div>
  );
};

export default TicketsSelection;
