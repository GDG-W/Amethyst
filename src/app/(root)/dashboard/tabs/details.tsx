import TicketList, { TicketProps } from "@/components/ui/tickets";
import { formatDateTime } from "@/lib/helpers";

import BuyTicketButton from "../components/BuyTicketButton";

export default function Details({ userId, tickets }: { userId: string; tickets: TicketProps[] }) {
  const details = [
    {
      title: "Full Name",
      value: "Temitope Aiyegbusi",
    },
    {
      title: "Email",
      value: "aiyegbusitope@gmail.com",
    },
    {
      title: "Ticket ID",
      value: userId,
    },
  ];

  const ticketsArr = tickets.map((t) => {
    const { date } = formatDateTime(t.date);
    return {
      theme: t.theme,
      date,
      time: "9:00 AM",
      ticket_type: t.ticket_type,
    };
  });
  return (
    <div className="flex flex-col gap-y-[23px] md:gap-y-[50px]">
      <div className="flex flex-col gap-1 md:self-center md:text-center">
        <h3 className="heading-5 md:heading-3 text-strong-950 font-medium">Welcome, Human</h3>
        <p className="label-3 md:label-2 text-sub-600">
          Scroll down to view all details of your ticket.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[27px]">
        <div className="bg-white-0 flex h-fit flex-col gap-5 rounded-lg px-[13px] py-[9px] md:gap-6">
          <p className="label-3 md:label-2 font-medium">Attendee Information</p>
          <div className="flex flex-col gap-y-5">
            {details.map((detail) => (
              <div key={detail.value} className="flex items-center justify-between">
                <p className="label-3 text-sub-600">{detail.title}</p>
                <p className="label-3 text-strong-950">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="label-3 md:label-2 text-strong-950 font-medium">Your Ticket(s)</p>
          <div>
            <TicketList tickets={ticketsArr} />
          </div>
          <div>
            <BuyTicketButton />
          </div>
        </div>
      </div>
    </div>
  );
}
