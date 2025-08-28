"use client";

import React from "react";

import Card from "@/components/ui/ticket-selection/ticket-card";
import DatePicker from "@/components/ui/ticket-selection/date-picker";
import Tabs from "@/components/ui/ticket-selection/ticket-tabs";
import { TicketType } from "@/types/ticket";
import { useTickets } from "@/hooks/useTickets";

type TicketsSelectionProps = {
  activeTab: TicketType;
  onTabChange: (id: TicketType) => void;
  selectedDates: string[];
  onSelectionChange: (dates: string[]) => void;
};

const TicketsSelection = ({
  activeTab,
  onTabChange,
  selectedDates,
  onSelectionChange,
}: TicketsSelectionProps) => {
  const { tickets } = useTickets(activeTab);
  const availableDateKeys = React.useMemo(() => {
    const set = new Set<string>();
    for (const t of tickets) if ((t.available_quantity ?? 0) > 0) set.add(t.date.split("T")[0]);
    return set;
  }, [tickets]);

  const dates = React.useMemo(
    () => [
      { day: 18, dayName: "Tue", date: "2025-11-18" },
      { day: 19, dayName: "Wed", date: "2025-11-19" },
      { day: 20, dayName: "Thu", date: "2025-11-20" },
      { day: 21, dayName: "Fri", date: "2025-11-21" },
      { day: 22, dayName: "Sat", date: "2025-11-22" },
    ],
    []
  );

  const tabsData: { id: TicketType; label: string }[] = [
    { id: "standard", label: "Standard Ticket" },
    { id: "pro", label: "Pro Ticket" },
  ];

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && (hash === "standard" || hash === "pro") && hash !== activeTab) {
      onTabChange(hash as TicketType);
    }
  }, [activeTab, onTabChange]);

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && (hash === "standard" || hash === "pro") && hash !== activeTab) {
        onTabChange(hash as TicketType);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeTab, onTabChange]);

  const header = (
    <>
      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#171717] text-sm font-semibold text-white">
        1
      </div>
      <h2 className="text-base font-medium text-black">Select Date(s)</h2>
    </>
  );

  const handleTabChange = (tabId: string) => {
    const newTab = tabId as TicketType;
    onTabChange(newTab);

    window.history.replaceState(null, "", `#${newTab}`);
  };

  const handleDateSelectionChange = (dates: string[]) => {
    onSelectionChange(dates);
  };

  console.log({
    availableDateKeys,
  });

  return (
    <div className="h-fit">
      <Card header={header} className="border-bg-surface-800 rounded-lg border bg-white">
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="flex gap-1 bg-[#F7F7F7] px-2 py-2 md:px-3"
        />

        <div className="mt-6">
          <DatePicker
            dates={dates}
            selectedDates={selectedDates}
            availableDateKeys={availableDateKeys}
            onSelectionChange={handleDateSelectionChange}
            className="w-full"
          />
        </div>
      </Card>
    </div>
  );
};

export default TicketsSelection;
