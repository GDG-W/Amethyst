import Image from "next/image";

import Button from "@/components/ui/home-button";

interface TicketCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  variant?: "standard" | "pro";
  onBuyTickets?: () => void;
}

export default function TicketCard({
  title,
  price,
  description,
  features,
  variant = "standard",
  onBuyTickets,
}: TicketCardProps) {
  const variants = {
    standard: {
      borderColor: "#4285F4",
      backgroundColor: "bg-[#C3ECF6]",
      hasBorder: true,
    },
    pro: {
      borderColor: "#F6B51E",
      backgroundColor: "bg-[#FFE7A5]",
      hasBorder: true,
    },
  };

  const cardStyle = variants[variant];

  return (
    <div
      className={`relative flex w-full flex-col gap-7 rounded-lg px-6 py-8 md:h-[28.375rem] md:w-[31.31rem] md:px-8 md:py-[2.625rem] ${cardStyle.backgroundColor} ${
        cardStyle.hasBorder ? "border-10" : ""
      }`}
      style={cardStyle.hasBorder ? { borderColor: cardStyle.borderColor } : {}}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 md:gap-[.625rem]">
          <div className="flex flex-col">
            <h3 className={`font-akira text-sm md:text-xl`}>{title}</h3>
            <p className="font-akira text-sm md:text-xl">
              (<span className="align-baseline text-[.5rem] md:text-[.725rem]">&#8358;</span>
              {price})
            </p>
          </div>
          <p className={`label-4 md:label-3 leading-[1.5rem] text-[#4D4D4D]`}>{description}</p>
        </div>

        <ul className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <Image src="/arrow-monoline.svg" alt="" width={31} height={24} />
              <span className="label-4 md:label-3 font-semibold md:whitespace-nowrap">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onBuyTickets}>BUY TICKETS</Button>
    </div>
  );
}
