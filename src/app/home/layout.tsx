import JoinUs from "@/components/layout/join-us";

import Hero from "@/components/layout/hero";

import BuySquadTickets from "../../components/layout/BuySquadTickets.tsx/index";

export default function Homelayout() {
  return (
    <div>
      <Hero />
      <BuySquadTickets />
      <JoinUs />
    </div>
  );
}
