import React from "react";

import ProTag from "@/components/icons/pro-tag";
import Barcode from "@/components/icons/barcode";

interface TicketProps {
  title: string;
  date: string;
  time?: string;
  ticketType?: string;
}

const Ticket: React.FC<TicketProps> = ({
  title,
  date,
  time = "10:00 AM",
  ticketType = "Standard",
}) => {
  const dayNumber = parseInt(date.match(/\d+/)?.[0] || "0");
  const isProTicket = dayNumber === 20;

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
      className={`relative mx-auto max-w-lg overflow-visible bg-white`}
      style={{
        clipPath: clipPath,
      }}
    >
      <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${getBorderColor(date)}`}></div>

      {isProTicket && (
        <div className='absolute -top-1 left-[0.2px] z-50'>
          <ProTag />
        </div>
      )}

      {/* Barcode */}
      <div className='absolute top-12 right-14 bottom-4'>
        <Barcode width={64} height={132} />
      </div>

      <div className={`p-6 ${isProTicket ? "pt-12" : "pt-6"} pr-20`}>
        <h1 className='mb-4 text-xl font-medium text-gray-900'>{title}</h1>

        <div className='mb-4 grid grid-cols-2 gap-6'>
          <div>
            <h3 className='mb-0.5 text-base font-medium text-[#5C5C5C]'>Date</h3>
            <p className='text-base text-[#A3A3A3]'>{date}</p>
          </div>
          <div>
            <h3 className='mb-1 text-base font-medium text-[#5C5C5C]'>Time</h3>
            <p className='text-base text-[#A3A3A3]'>{time}</p>
          </div>
        </div>

        <div>
          <h3 className='mb-1 text-base font-medium text-[#5C5C5C]'>Ticket Type</h3>
          <p className='text-base text-[#A3A3A3]'>{ticketType}</p>
        </div>
      </div>
    </div>
  );
};

const TicketList = () => {
  const tickets = [
    {
      title: "Kickoff & Big Ideas",
      date: "18th November",
      time: "10:00 AM",
      ticketType: "Standard",
      day: "Monday",
    },
    {
      title: "Backend & Cloud Mastery",
      date: "19th November",
      time: "10:00 AM",
      ticketType: "Pro",
    },
    {
      title: "Frontend Fundamentals",
      date: "20th November",
      time: "2:00 PM",
      ticketType: "Standard",
      day: "Friday",
    },
    {
      title: "Advanced Algorithms",
      date: "21st November",
      time: "10:00 AM",
      ticketType: "Standard",
      day: "Tuesday",
    },
    {
      title: "Advanced Algorithms",
      date: "22nd November",
      time: "10:00 AM",
      ticketType: "Standard",
      day: "Tuesday",
    },
  ];

  return (
    <div className='min-h-screen py-8'>
      <div className='mx-auto max-w-4xl px-28'>
        <div className='custom-scrollbar overflow-y-auto' style={{ maxHeight: "480px" }}>
          <div className='space-y-4'>
            {tickets.map((ticket, index) => (
              <Ticket key={index} {...ticket} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
