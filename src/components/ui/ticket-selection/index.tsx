"use client";

import React from "react";

import Card from "@/components/ui/ticket-selection/ticket-card";
import DatePicker from "@/components/ui/ticket-selection/date-picker";
import Tabs from "@/components/ui/ticket-selection/ticket-tabs";
import { Ticket, TicketType } from "@/types/ticket";

type TicketsSelectionProps = {
  activeTab: TicketType;
  onTabChange: (id: TicketType) => void;
  selectedDates: string[];
  onSelectionChange: (dates: string[]) => void;
  tickets: Ticket[];
};

const TicketsSelection = ({
  activeTab,
  onTabChange,
  selectedDates,
  onSelectionChange,
  tickets,
}: TicketsSelectionProps) => {
  const availableDateKeys = React.useMemo(() => {
    const set = new Set<string>();
    for (const t of tickets) {
      if ((t.available_quantity ?? 0) > 0) {
        set.add(t.date.split("T")[0]);
      }
    }
    return set;
  }, [tickets]);

  const dates = React.useMemo(() => {
    if (activeTab === "pro") {
      const proTicket = tickets.find((t) => t.ticket_type === "pro");
      const iso = proTicket ? proTicket.date.split("T")[0] : "2026-11-13";
      return [{ day: "13 & 14" as unknown as number, dayName: "Fri & Sat", date: iso }];
    }
    const friTicket = tickets.find((t) => t.day === "fri");
    const satTicket = tickets.find((t) => t.day === "sat");
    return [
      { day: 13, dayName: "Fri", date: friTicket ? friTicket.date.split("T")[0] : "2026-11-13" },
      { day: 14, dayName: "Sat", date: satTicket ? satTicket.date.split("T")[0] : "2026-11-14" },
    ];
  }, [activeTab, tickets]);

  const tabsData: { id: TicketType; label: string }[] = [
    { id: "standard", label: "Standard Ticket" },
    { id: "pro", label: "Full Experience Ticket" },
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
