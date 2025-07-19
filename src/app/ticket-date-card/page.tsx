"use client";
import React, { useState } from "react";

import Card from "@/components/ui/ticket-card";
import Tabs from "@/components/ui/ticket-tabs";
import DatePicker from "@/components/ui/date-picker";

const TicketsSelectionPage = () => {
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
      <h2 className='text-base font-medium text-[#000]'>Select Date(s)</h2>
    </>
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as "single" | "multiple" | "pro");
    // Clear selected dates when switching tabs
    setSelectedDates([]);
  };

  const handleDateSelectionChange = (dates: string[]) => {
    setSelectedDates(dates);
  };

  return (
    <div className='bg-gray-50 min-h-screen p-4 mx-w-md mx-auto'>
      <Card header={header}>
        <Tabs tabs={tabsData} activeTab={activeTab} onTabChange={handleTabChange} />

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

export default TicketsSelectionPage;
