"use client";
import React, { useState } from "react";

import Card from "@/components/ui/ticket-selection/ticket-card";
import Tabs from "@/components/ui/ticket-selection/ticket-tabs";
import DatePicker from "@/components/ui/ticket-selection/date-picker";
import { TicketType } from "@/types/ticket";

const TicketsSelection = () => {
  const [activeTab, setActiveTab] = useState<TicketType>("standard");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const tabsData: { id: TicketType; label: string }[] = [
    { id: "standard", label: "Standard Ticket" },
    { id: "pro", label: "Pro Ticket" },
  ];

  const header = (
    <>
      <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-[#171717] text-sm font-semibold text-white'>
        1
      </div>
      <h2 className='text-base font-medium text-black'>Select Date(s)</h2>
    </>
  );

  const handleTabChange = (tabId: string) => {
    const newTab = tabId as TicketType;
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
    <div className='bg-bg-strong-950 min-h-screen p-4'>
      <Card header={header} className='bg-bg-strong-950 border-bg-surface-800 rounded-lg border'>
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className='flex gap-1 bg-[#F7F7F7] px-2 py-2 md:px-3'
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
