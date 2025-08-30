import JoinUs from "@/components/layout/join-us";

import Hero from "@/components/layout/hero";

import BuySquadTickets from "../../components/layout/squad-tickets/index";
import FAQ from "../../components/layout/FAQ/index";
import Footer from "../../components/layout/Footer/index";
import MobileStickyNote from "../../components/layout/sticky-notes/mobile";
import Recap from "../../components/layout/recap/index";
import StickyNote from "../../components/layout/sticky-notes/index";

import BuySquadTickets from "../../components/layout/BuySquadTickets.tsx/index";

export default function Homelayout() {
  return (
    <div>
      <Hero />
      <StickyNote />
      <MobileStickyNote />
      <BuySquadTickets />
      <FAQ />
      <Recap />
      <JoinUs />
      <Footer />
    </div>
  );
}
