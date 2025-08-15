import TicketCard from "./ticket-card";

const ticketTypes = [
  {
    title: "STANDARD TICKET",
    price: "(\u20A610,000 per day)",
    description: "Open to everyone — whether you're just starting out or deep in the industry",
    features: [
      "Access to all talks and sessions",
      "Available throughout the five days",
      "Access to sponsor booths",
      "Entry to the networking area",
    ],
    variant: "standard" as const,
  },
  {
    title: "PRO TICKET",
    price: `(\u20A670,000 FOR THURSDAY)`,
    description:
      "For those who want more access and a more focused, premium experience — all in one day",
    features: [
      "Exclusive access to sponsor booths & product demos",
      "Access to masterclasses and technical workshops",
      "Invitation to the Executive Roundtable",
      "Special swags and merch",
    ],
    variant: "pro" as const,
  },
];

export default function index() {
  return (
    <section
      aria-label="Ticket Section"
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#1E1E1E]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-[3.0625rem] py-20">
        <div className="flex flex-col items-center justify-center gap-[.65rem]">
          <h1 className="font-akira heading-5 md:heading-1 w-5/6 max-w-5xl text-center leading-[2rem] text-white md:w-full md:leading-[4rem]">
            BUY TICKETS FOR YOU AND YOUR SQUAD
          </h1>
          <p className="label-4 md:label-3 w-5/6 max-w-2xl text-center text-[#CCCCCC]">
            DevFest hits different when you roll with your crew. Grab your Standard or Pro tickets,
            pick your day, and pull up with your friends
          </p>
        </div>

        <div className="flex h-full w-full flex-wrap justify-center gap-8 px-5">
          {ticketTypes.map((ticket, index) => (
            <TicketCard
              key={index}
              title={ticket.title}
              price={ticket.price}
              description={ticket.description}
              features={ticket.features}
              variant={ticket.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
