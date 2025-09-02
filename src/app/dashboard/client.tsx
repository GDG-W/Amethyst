"use client";

import { useState } from "react";

import Tab from "@/components/ui/tab";

import Details from "./tabs/details";
import RSVP from "./tabs/rsvp";

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="mt-4 flex flex-col md:mt-[43px]">
      <div className="mb-[35px] flex w-full justify-center md:mb-[31px]">
        <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {tabItems[activeTab]}
    </div>
  );
}

const tabItems: Record<string, React.ReactElement> = {
  details: <Details />,
  rsvp: <RSVP />,
};

const tabs = [
  {
    name: "details",
    label: "Ticket details",
  },
  {
    name: "rsvp",
    label: "RSVP for Sessions",
  },
];
