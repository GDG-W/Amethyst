import React from "react";

import ProTag from "@/components/icons/pro-tag";
import Barcode from "@/components/icons/barcode";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface TicketProps {
  theme: string;
  date: string;
  time?: string;
  ticket_type?: string;
}

const Ticket: React.FC<TicketProps> = ({
  theme,
  date,
  time = "10:00 AM",
  ticket_type = "Standard",
}) => {
  const dayNumber = parseInt(date.match(/\d+/)?.[0] || "0");
  const isProTicket = dayNumber === 20 && ticket_type === "Pro";

  const getBorderColor = (date: string): string => {
    const dayNumber = parseInt(date.match(/\d+/)?.[0] || "0");
    switch (dayNumber) {
      case 18:
        return "bg-[#34A853]";
      case 19:
        return "bg-[#EA4335]";
      case 20:
        return "bg-[#F9AB00]";
      case 21:
        return "bg-[#4285F4]";
      case 22:
        return "bg-[#1E1E1E]";
      default:
        return "bg-gray-500";
    }
  };

  const clipPath = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cclipPath id='ticket' clipPathUnits='objectBoundingBox'%3e%3cpath d='M0,0 L0.95,0 L0.95,0.06 Q0.925,0.06 0.925,0.11 Q0.925,0.16 0.95,0.16 L0.95,0.19 Q0.925,0.19 0.925,0.24 Q0.925,0.29 0.95,0.29 L0.95,0.32 Q0.925,0.32 0.925,0.37 Q0.925,0.42 0.95,0.42 L0.95,0.45 Q0.925,0.45 0.925,0.50 Q0.925,0.55 0.95,0.55 L0.95,0.58 Q0.925,0.58 0.925,0.63 Q0.925,0.68 0.95,0.68 L0.95,0.71 Q0.925,0.71 0.925,0.76 Q0.925,0.81 0.95,0.81 L0.95,0.84 Q0.925,0.84 0.925,0.89 Q0.925,0.94 0.95,0.94 L0.95,1 L0,1 Z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e#ticket")`;

  return (
    <div
      className={`relative mx-auto w-full max-w-lg overflow-visible bg-white`}
      style={{
        clipPath: clipPath,
      }}
    >
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${getBorderColor(date)}`}></div>

      {isProTicket && (
        <div className="absolute -top-1 left-[0.2px] z-50">
          <ProTag />
        </div>
      )}

      {/* Barcode */}
      <div className="xs:right-3 xs:w-4 xs:h-28 absolute top-6 right-16 h-20 w-8 sm:top-12 sm:right-14 sm:h-32 md:w-16">
        <div className="h-full w-full">
          <Barcode width={64} height={132} />
        </div>
      </div>

      <div
        className="absolute -top-3 right-26 -bottom-3 w-1 md:right-36"
        style={{
          backgroundImage: `radial-gradient(circle, #FFFCF5 50%, transparent 0%)`,
          backgroundSize: "4px calc(100% / 7)",
          backgroundRepeat: "repeat-y",
        }}
      ></div>

      <div className={`p-4 pr-14 sm:p-6 sm:pr-20`}>
        <h1 className="mb-3 max-w-48 font-medium text-gray-900 sm:mb-4 md:max-w-64 md:text-lg">
          {theme}
        </h1>

        <div className="mb-3 grid grid-cols-2 gap-2 md:mb-4 md:gap-4">
          <div>
            <h3 className="mb-0.5 text-sm font-medium text-[#5C5C5C] md:text-base">Date</h3>
            <p className="text-sm text-[#A3A3A3] md:text-base">{date}</p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium text-[#5C5C5C] md:text-base">Time</h3>
            <p className="text-sm text-[#A3A3A3] md:text-base">{time}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium text-[#5C5C5C] md:text-base">Ticket Type</h3>
          <p className="text-sm text-[#A3A3A3] capitalize md:text-base">{ticket_type}</p>
        </div>
      </div>
    </div>
  );
};

const TicketList = ({ tickets = ticketsArr }: { tickets: TicketProps[] }) => {
  const isMobile = useMediaQuery(767, "max");
  return (
    <div className={`${!isMobile && "custom-scrollbar"} md:max-h-[334px] md:overflow-y-auto`}>
      <div className="space-y-3 sm:space-y-4">
        {tickets.map((ticket, index) => (
          <Ticket key={index} {...ticket} />
        ))}
      </div>
    </div>
  );
};

const ticketsArr = [
  {
    theme: "Kickoff & Big Ideas",
    date: "18th November",
    time: "10:00 AM",
    ticket_type: "Pro",
    day: "Monday",
  },
  {
    theme: "Frontend development and Mobile development",
    date: "19th November",
    time: "10:00 AM",
    ticket_type: "Standard",
  },
  {
    theme: "Frontend Fundamentals",
    date: "20th November",
    time: "2:00 PM",
    ticket_type: "Pro",
    day: "Friday",
  },
  {
    theme: "Advanced Algorithms",
    date: "21st November",
    time: "10:00 AM",
    ticket_type: "Standard",
    day: "Tuesday",
  },
  {
    theme: "Advanced Algorithms",
    date: "22nd November",
    time: "10:00 AM",
    ticket_type: "Standard",
    day: "Tuesday",
  },
];

export default TicketList;
